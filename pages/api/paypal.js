import paypal from '@paypal/checkout-server-sdk';

export default async function handler(req, res) {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_SECRET;
  const environment = new paypal.core.SandboxEnvironment(
    clientId,
    clientSecret
  );
  const client = new paypal.core.PayPalHttpClient(environment);
  const request = new paypal.orders.OrdersCreateRequest();

  // const total = req.body.reduce((sum, item) => {
  //   return sum + storeItems.get(item.id).price * item.quantity;
  // }, 0);

  request.prefer('return=representation');

  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'GBP',
          value: '6',
          // breakdown: {
          //   item_total: {
          //     currency_code: 'GBP',
          //     value: '19',
          //   },
          // },
        },
        // items: req.body.order.map((item) => {
        //   return {
        //     name: item.id,
        //     unit_amount: {
        //       currency_code: 'GBP',
        //       value: 2,
        //     },
        //     quantity: item.quantity,
        //   };
        // }),
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
