import client from '../../utils/client';
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
      const product = await client.fetch(
        `*[_type == 'product' && _id == '${item.id}'][0]`
      );
      return {
        ...product,
        quantity: item.quantity,
      };
    })
  );

  // paypal order create
  const accessToken = await generateAccessToken(clientId, clientSecret, base);

  const paypalItems = items.map((item) => ({
    name: item.name,
    sku: item._id, // store id in sku key
    unit_amount: {
      currency_code: 'GBP',
      value: item.price.toString(), // all values must be string in paypal api
    },
    quantity: item.quantity,
  }));

  // calculate total
  const total = paypalItems
    .reduce(
      (a, item) => a + item.quantity * parseInt(item.unit_amount.value),
      0
    )
    .toString();

  const response = await fetch(`${base}/v2/checkout/orders`, {
    method: 'POST',
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
    return res.status(200).json(order);
  }

  return res.status(500).send('Failed to create Paypal order');
}
