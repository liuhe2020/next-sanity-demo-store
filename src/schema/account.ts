const account = {
  name: 'account',
  title: 'Account',
  type: 'document',
  fields: [
    {
      name: 'userName',
      type: 'string',
    },
    {
      name: 'providerType',
      type: 'string',
    },
    {
      name: 'providerId',
      type: 'string',
    },
    {
      name: 'providerAccountId',
      type: 'string',
    },
    {
      name: 'refreshToken',
      type: 'string',
    },
    {
      name: 'accessToken',
      type: 'string',
    },
    {
      name: 'accessTokenExpires',
      type: 'number',
    },
    {
      name: 'user',
      title: 'User',
      type: 'reference',
      to: { type: 'user' },
    },
  ],
};

export default account;
