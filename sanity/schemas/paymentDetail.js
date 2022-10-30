export default {
  title: 'Payment Detail',
  name: 'paymentDetail',
  type: 'object',
  fields: [
    {
      title: 'Paypal Transaction ID',
      name: 'paypalTransactionId',
      type: 'string',
    },
    {
      title: 'Paypal Email',
      name: 'paypalEmail',
      type: 'string',
    },
    {
      title: 'Payment Date',
      name: 'paymentDate',
      type: 'datetime',
    },
  ],
};
