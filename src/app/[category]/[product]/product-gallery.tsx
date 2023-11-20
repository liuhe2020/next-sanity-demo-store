'use client';
import ImageGallery from 'react-image-gallery';

export default function ProductGallery({ product }: { product: Product }) {
  const images = product.images.map((image) => ({
    original: image.url,
    thumbnail: image.url,
    originalWidth: 600,
    originalHeight: 600,
  }));

  return <ImageGallery items={images} showNav={false} showFullscreenButton={false} useBrowserFullscreen={false} showPlayButton={false} />;
}
