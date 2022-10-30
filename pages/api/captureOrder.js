import generateAccessToken from '../../utils/accessToken';
import mySanityClient from '../../utils/client';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Not allowed');

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_SECRET;
  const base = 'https://api-m.sandbox.paypal.com';
  const orderId = req.body;

  // helper to output order update object for sanity
  const sanityOrder = (order) => ({
    orderTotal: parseInt(
      order.purchase_units[0].payments.captures[0].amount.value
    ),
    deliveryAddress: {
      fullName: order.purchase_units[0].shipping.name.full_name,
      address: `${order.purchase_units[0].shipping.address.address_line_1}, ${order.purchase_units[0].shipping.address.address_line_2}`,
      city: order.purchase_units[0].shipping.address.admin_area_2,
      county: order.purchase_units[0].shipping.address.admin_area_1,
      postcode: order.purchase_units[0].shipping.address.postal_code,
      country: order.purchase_units[0].shipping.address.country_code,
    },
    paymentDetail: {
      paid: false,
      paypalTransactionId: order.purchase_units[0].payments.captures[0].id,
      paypalEmail: order.payment_source.paypal.email_address,
      paymentDate: order.purchase_units[0].payments.captures[0].create_time,
    },
  });

  // paypal payment capture
  const accessToken = await generateAccessToken(clientId, clientSecret, base);

  const response = await fetch(
    `${base}/v2/checkout/orders/${orderId}/capture`,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status === 200 || response.status === 201) {
    const data = await response.json();
    // console.log(data);
    const updateOrder = await mySanityClient
      .patch(orderId)
      .set(sanityOrder(data))
      .commit();
    const updateRes = await updateOrder;
    console.log(updateRes);
    return res.status(200).json(data);
  }

  const errorMessage = await response.text();
  throw new Error(errorMessage);
}
