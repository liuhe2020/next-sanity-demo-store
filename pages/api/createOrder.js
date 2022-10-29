import { v4 as uuidv4 } from 'uuid';
import mySanityClient from '../../utils/client';
import generateAccessToken from '../../utils/accessToken';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Not allowed');

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_SECRET;
  const base = 'https://api-m.sandbox.paypal.com';
  const clientOrder = req.body;

  // check items from client and match prices from sanity
  const items = await Promise.all(
    clientOrder.map(async (item) => {
      const product = await mySanityClient.fetch(
        `*[_type == 'product' && _id == '${item.id}'][0]`
      );
      return {
        ...product,
        quantity: item.quantity,
      };
    })
  );

  // calculate total
  const total = items
    .reduce(
      (a, item) => a + item.quantity * parseInt(item.unit_amount.value),
      0
    )
    .toString();

  // store new order in sanity
  const sanityOrder = (id) => ({
    _type: 'order',
    name: id,
    orderItems: items.map((item) => ({
      name: item.name,
      _key: uuidv4(),
      quantity: item.quantity,
    })),
    paymentDetail: {
      paid: false,
    },
  });

  // paypal request
  const accessToken = await generateAccessToken(clientId, clientSecret, base);

  const paypalItems = items.map((item) => ({
    name: item.name,
    unit_amount: {
      currency_code: 'GBP',
      value: item.price.toString(), // value must be string for paypal to work
    },
    quantity: item.quantity,
  }));

  const response = await fetch(`${base}/v2/checkout/orders`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'GBP',
            value: total,
            /* breakdown required when including the items array */
            breakdown: {
              item_total: {
                currency_code: 'GBP',
                value: total,
              },
            },
          },
          items: paypalItems,
        },
      ],
    }),
  });

  if (response.status === 200 || response.status === 201) {
    const order = await response.json();
    const { id } = order;
    const createOrder = await mySanityClient.create(sanityOrder(id));
    console.log(order);
    return res.status(200).json(order);
  }

  const errorMessage = await response.text();
  throw new Error(errorMessage);
}
