export default {
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
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
      name: 'userName',
      title: 'User Name',
      type: 'string',
    },
    {
      name: 'orderSubtotal',
      title: 'Order Subtotal',
      type: 'number',
    },
    {
      name: 'deliveryFee',
      title: 'Delivery Fee',
      type: 'number',
    },
    {
      name: 'orderTotal',
      title: 'Order Total',
      type: 'number',
    },
    {
      name: 'paymentMethod',
      title: 'Payment Method',
      type: 'string',
    },
    {
      title: 'Delivery Address',
      name: 'deliveryAddress',
      type: 'deliveryAddress',
    },
    {
      title: 'Payment Result',
      name: 'paymentResult',
      type: 'paymentResult',
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
      title: 'Payment received',
      name: 'isPaid',
      type: 'boolean',
    },
    {
      title: 'Payment Date',
      name: 'paidAt',
      type: 'datetime',
    },
    {
      title: 'Delivered',
      name: 'isDelivered',
      type: 'boolean',
    },
    {
      title: 'Delivery Date',
      name: 'deliveredAt',
      type: 'datetime',
    },
    {
      title: 'Order Date',
      name: 'createdAt',
      type: 'datetime',
    },
  ],
};
