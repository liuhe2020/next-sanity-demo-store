import imageUrlBuilder from '@sanity/image-url';
import client from './client';

const builder = imageUrlBuilder(client);

export default function urlFor(source: string) {
  return builder.image(source);
}
