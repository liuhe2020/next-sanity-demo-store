import sanityClient from '@sanity/client';
import config from './config';

const mySanityClient = sanityClient({
  projectId: config.projectId,
  dataset: config.dataset,
  apiVersion: '2021-08-31',
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  useCdn: true,
});

export default mySanityClient;
