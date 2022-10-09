import { PayPalButtons } from '@paypal/react-paypal-js';

export default function test() {
  const createOrder = () => {
    return fetch('/api/paypal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [
          {
            id: 1,
            quantity: 2,
          },
          { id: 2, quantity: 3 },
        ],
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ id }) => {
        return id;
      })
      .catch((e) => {
        console.error(e.error);
      });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture();
  };

  return <PayPalButtons createOrder={createOrder} onApprove={onApprove} />;
}
