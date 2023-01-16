// export default {
//   title: 'Order Item',
//   name: 'orderItem',
//   type: 'object',
//   fields: [
//     {
//       title: 'Name',
//       name: 'name',
//       type: 'string',
//     },
//     {
//       title: 'Image',
//       name: 'image',
//       type: 'string',
//     },
//     {
//       title: 'Price',
//       name: 'price',
//       type: 'number',
//     },
//     {
//       title: 'Quantity',
//       name: 'quantity',
//       type: 'number',
//     },
//   ],
// };

export default {
  title: 'Order Item',
  name: 'orderItem',
  type: 'object',
  fields: [
    {
      title: 'Product',
      name: 'product',
      type: 'reference',
      to: [{ type: 'product' }],
    },
    {
      title: 'Quantity',
      name: 'quantity',
      type: 'number',
    },
  ],
};
