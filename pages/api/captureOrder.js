import { v4 as uuidv4 } from 'uuid';
import generateAccessToken from '../../utils/accessToken';
import client from '../../utils/client';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Not allowed');

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_SECRET;
  const base = 'https://api-m.sandbox.paypal.com';
  const orderId = req.body;

  // get user/session
  const session = await unstable_getServerSession(req, res, authOptions);

  // helper to output order object for sanity
  const sanityOrder = (order, capture) => {
    const orderObj = {
      _type: 'order',
      name: orderId, //paypal order/capture id (not transaction id)
      orderItems: order.purchase_units[0].items.map((item) => ({
        product: {
          _type: 'reference',
          _ref: item.sku,
        },
        quantity: parseInt(item.quantity),
        _key: uuidv4(),
      })),
      orderTotal: parseInt(
        capture.purchase_units[0].payments.captures[0].amount.value
      ),
      deliveryAddress: {
        fullName: capture.purchase_units[0].shipping.name.full_name,
        address: `${capture.purchase_units[0].shipping.address.address_line_1}, ${capture.purchase_units[0].shipping.address.address_line_2}`,
        city: capture.purchase_units[0].shipping.address.admin_area_2,
        county: capture.purchase_units[0].shipping.address.admin_area_1,
        postcode: capture.purchase_units[0].shipping.address.postal_code,
        country: capture.purchase_units[0].shipping.address.country_code,
      },
      paymentDetail: {
        paypalTransactionId: capture.purchase_units[0].payments.captures[0].id,
        paypalName: Object.values(capture.payment_source.paypal.name).join(' '),
        paypalEmail: capture.payment_source.paypal.email_address,
        paymentDate: capture.purchase_units[0].payments.captures[0].create_time,
      },
    };

    // tie order to user if session exists/user signed in
    if (!session) return orderObj;
    return {
      ...orderObj,
      user: {
        _type: 'reference',
        _ref: session ? session.user._id : null,
      },
    };
  };

  // paypal payment capture
  const accessToken = await generateAccessToken(clientId, clientSecret, base);

  const orderRes = await fetch(`${base}/v2/checkout/orders/${orderId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const orderData = await orderRes.json();

  const captureRes = await fetch(
    `${base}/v2/checkout/orders/${orderId}/capture`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (captureRes.status === 200 || captureRes.status === 201) {
    const captureData = await captureRes.json();

    // store new order in sanity database
    const newSanityOrder = await client.create(
      sanityOrder(orderData, captureData)
    );

    // fetch order with orderItems ref expanded and return to client side
    const newSanityOrderProjection = await client.fetch(
      `*[_id == '${newSanityOrder._id}'][0]{..., orderItems[]{product->, quantity}}`
    );
    return res.status(200).json(newSanityOrderProjection);
  }

  return res.status(500).send('Failed to capture Paypal order');
}
