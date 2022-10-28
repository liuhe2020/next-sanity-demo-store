export default {
  title: 'Shipment Detail',
  name: 'shipmentDetail',
  type: 'object',
  fields: [
    {
      title: 'Despatched',
      name: 'despatched',
      type: 'boolean',
    },
    {
      title: 'Tracking Number',
      name: 'trackingNumber',
      type: 'string',
    },
    {
      title: 'Despatch Date',
      name: 'despatchDate',
      type: 'datetime',
    },
    {
      title: 'Delivery Date',
      name: 'deliveryDate',
      type: 'datetime',
    },
  ],
};
