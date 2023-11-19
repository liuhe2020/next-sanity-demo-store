import generateAccessToken from '@/utils/accessToken';
import { client } from '@/utils/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  if (!request.body) return NextResponse.json('No request body.');

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!;
  const clientSecret = process.env.PAYPAL_SECRET!;
  const base = 'https://api-m.sandbox.paypal.com';
  const clientOrder: {
    id: string;
    quantity: number;
  }[] = await request.json();

  // check items from client and match prices from sanity
  const items = await Promise.all(
    clientOrder.map(async (item) => {
      const product = await client.fetch(`*[_type == 'product' && _id == '${item.id}'][0]`);
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
  const total = paypalItems.reduce((a, item) => a + item.quantity * parseInt(item.unit_amount.value), 0).toString();

  const paypalRes = await fetch(`${base}/v2/checkout/orders`, {
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

  if (paypalRes.ok) {
    const order = await paypalRes.json();
    return NextResponse.json(order);
  }

  return NextResponse.json('Failed to create Paypal order');
}
