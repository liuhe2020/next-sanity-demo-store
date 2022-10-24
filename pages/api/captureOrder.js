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
  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  const orderID = req.body.orderID;
  console.log(orderID);

  request.requestBody({});

  try {
    const capture = await client.execute(request);
    console.log(`Response: ${JSON.stringify(capture)}`);
    console.log(`Capture: ${JSON.stringify(capture.result)}`);
    const result = capture.result;
    const resJson = {
      result,
    };
    res.json(resJson);
    // return capture.result;
  } catch (err) {
    // Handle any errors from the call
    console.error(err);
    return res.send(500);
  }
}

// Update payment to PAID status once completed
//   await prisma.payment.updateMany({
//     where: {
//       orderID,
//     },
//     data: {
//       status: 'PAID',
//     },
//   });
//   res.json({ ...response.result });
