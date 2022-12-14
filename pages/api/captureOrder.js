import { v4 as uuidv4 } from 'uuid';
import generateAccessToken from '../../utils/accessToken';
import mySanityClient from '../../utils/client';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Not allowed');

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_SECRET;
  const base = 'https://api-m.sandbox.paypal.com';
  const orderId = req.body;

  // helper to output order object for sanity
  const sanityOrder = (order, capture) => ({
    _type: 'order',
    name: orderId, //paypal order/capture id (not transaction id)
    orderItems: order.purchase_units[0].items.map((item) => ({
      name: item.name,
      price: parseInt(item.unit_amount.value),
      image: item.description,
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
  });

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
    const createSanityOrder = await mySanityClient.create(
      sanityOrder(orderData, captureData)
    );
    // return res.status(200).json(captureData);
    return res.status(200).json(sanityOrder(orderData, captureData));
  }

  const errorMessage = await captureRes.text();
  throw new Error(errorMessage);
}
