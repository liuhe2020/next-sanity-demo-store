export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'url',
    },
    {
      name: 'emailVerified',
      title: 'Email Verified',
      type: 'datetime',
    },
    {
      name: 'bag',
      title: 'Bag',
      type: 'string',
    },
  ],
};
