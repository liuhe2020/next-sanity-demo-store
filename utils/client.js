// import sanityClient from '@sanity/client';
// import config from './config';

// const client = sanityClient({
//   projectId: config.projectId,
//   dataset: config.dataset,
//   apiVersion: '2021-08-31',
//   // token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
//   useCdn: true,
// });

// export default client;

import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: typeof document !== 'undefined', // server-side is statically generated, the CDN is only necessary beneficial if queries are called on-demand
});

export default client;
