export default {
  title: 'Payment Detail',
  name: 'paymentDetail',
  type: 'object',
  fields: [
    {
      title: 'Paid',
      name: 'paid',
      type: 'boolean',
    },
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
