export default {
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    { name: 'name', title: 'Paypal Order ID', type: 'string' },
    {
      title: 'User',
      name: 'user',
      type: 'reference',
      to: [{ type: 'user' }],
      options: {
        disableNew: true,
      },
    },
    {
      name: 'orderSubtotal',
      title: 'Order Subtotal',
      type: 'number',
    },
    {
      name: 'postage',
      title: 'Postage',
      type: 'number',
    },
    {
      name: 'orderTotal',
      title: 'Order Total',
      type: 'number',
    },
    {
      title: 'Order Items',
      name: 'orderItems',
      type: 'array',
      of: [
        {
          title: 'Order Item',
          type: 'orderItem',
        },
      ],
    },
    {
      title: 'Delivery Address',
      name: 'deliveryAddress',
      type: 'deliveryAddress',
    },
    {
      title: 'Payment Detail',
      name: 'paymentDetail',
      type: 'paymentDetail',
    },
    {
      title: 'Shipment Detail',
      name: 'shipmentDetail',
      type: 'shipmentDetail',
    },
  ],
};
