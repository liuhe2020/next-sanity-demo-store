import generateAccessToken from '../../utils/accessToken';
import mySanityClient from '../../utils/client';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Not allowed');

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_SECRET;
  const base = 'https://api-m.sandbox.paypal.com';
  const orderId = req.body;

  console.log(orderId);

  // store order in sanity
  // const newOrder = {
  //   _type: 'order',
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: hashedPassword,
  // };

  // const createUser = await mySanityClient.create(newUser);

  // paypal request
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
    console.log(data);
    return res.status(200).json(data);
  }

  const errorMessage = await response.text();
  throw new Error(errorMessage);
}
