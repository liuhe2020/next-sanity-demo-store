import imageUrlBuilder from '@sanity/image-url';
import mySanityClient from './client';

const builder = imageUrlBuilder(mySanityClient);

export default function urlFor(source) {
  return builder.image(source);
}
