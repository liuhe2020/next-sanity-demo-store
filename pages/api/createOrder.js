import paypal from '@paypal/checkout-server-sdk';
import mySanityClient from '../../utils/client';

export default async function handler(req, res) {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_SECRET;
  const environment = new paypal.core.SandboxEnvironment(
    clientId,
    clientSecret
  );
  const client = new paypal.core.PayPalHttpClient(environment);
  const request = new paypal.orders.OrdersCreateRequest();
  const clientOrder = req.body;

  // check items from client and match prices from sanity
  const items = await Promise.all(
    clientOrder.map(async (item) => {
      const product = await mySanityClient.fetch(
        `*[_type == 'product' && _id == '${item.id}'][0]`
      );
      return {
        name: product.name,
        unit_amount: {
          currency_code: 'GBP',
          value: product.price.toString(), // value must be string for paypal to work
        },
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

  // paypal request
  request.prefer('return=representation');

  request.requestBody({
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
        items: items,
      },
    ],
  });

  try {
    const order = await client.execute(request);
    res.json({ orderID: order.result.id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
