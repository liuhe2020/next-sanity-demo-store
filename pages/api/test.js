import { v4 as uuidv4 } from 'uuid';
import mySanityClient from '../../utils/client';
import generateAccessToken from '../../utils/accessToken';
import urlFor from '../../utils/image';

export default async function handler(req, res) {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_SECRET;
  const base = 'https://api-m.sandbox.paypal.com';

  const accessToken = await generateAccessToken(clientId, clientSecret, base);

  const response = await fetch(`${base}/v2/checkout/orders/92F13938C72170058`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();
  console.log(data.purchase_units[0].items);
}
