import paypal from '@paypal/checkout-server-sdk';

export default async function handler(req, res) {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_SECRET;
  const environment = new paypal.core.SandboxEnvironment(
    clientId,
    clientSecret
  );
  const client = new paypal.core.PayPalHttpClient(environment);

  const storeItems = new Map([
    [1, { price: 100, name: 'Learn React Today' }],
    [2, { price: 200, name: 'Learn CSS Today' }],
  ]);

  const request = new paypal.orders.OrdersCreateRequest();

  const total = req.body.items.reduce((sum, item) => {
    return sum + storeItems.get(item.id).price * item.quantity;
  }, 0);

  request.prefer('return=representation');

  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'GBP',
          value: total,
          breakdown: {
            item_total: {
              currency_code: 'GBP',
              value: total,
            },
          },
        },
        items: req.body.items.map((item) => {
          const storeItem = storeItems.get(item.id);
          return {
            name: storeItem.name,
            unit_amount: {
              currency_code: 'GBP',
              value: storeItem.price,
            },
            quantity: item.quantity,
          };
        }),
      },
    ],
  });

  try {
    const order = await client.execute(request);
    res.json({ id: order.result.id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
