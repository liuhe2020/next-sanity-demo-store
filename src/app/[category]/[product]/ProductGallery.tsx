'use client';
import ImageGallery from 'react-image-gallery';
import urlFor from '@/utils/image';

export default function ProductGallery({ product }: { product: Product }) {
  const images = product.images.map((image) => ({
    original: urlFor(image).url(),
    thumbnail: urlFor(image).url(),
    originalWidth: 800,
    originalHeight: 800,
  }));

  return <ImageGallery items={images} showNav={false} showFullscreenButton={false} useBrowserFullscreen={false} showPlayButton={false} />;
}
