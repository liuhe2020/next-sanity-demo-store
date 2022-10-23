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

  const items = await Promise.all(
    req.body.map(async (item) => {
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

  request.prefer('return=representation');

  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'GBP',
          value: '100',
          breakdown: {
            item_total: {
              /* Required when including the items array */
              currency_code: 'GBP',
              value: '100',
            },
          },
        },
        items: [
          {
            name: 'First Product Name' /* Shows within upper-right dropdown during payment approval */,
            description:
              'Optional descriptive text..' /* Item details will also be in the completed paypal.com transaction view */,
            unit_amount: {
              currency_code: 'GBP',
              value: '50',
            },
            quantity: '2',
          },
        ],
      },
    ],
  });

  try {
    const order = await client.execute(request);
    console.log(order);
    res.json({ orderID: order.result.id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
