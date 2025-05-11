import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';
import { RefObject } from 'react';
import { ImageData } from '../../types';

interface ImageGalleryProps {
  images: ImageData[];
  lastImageRef: RefObject<HTMLLIElement | null>;
  onImageClick: (image: ImageData) => void;
}

const ImageGallery = ({ images, lastImageRef, onImageClick }: ImageGalleryProps) => {
  if (!images?.length) return null;

  return (
    <ul className={css.gallery}>
      {images.map((image, index) => (
        <li
          key={image.id}
          className={css.item}
          ref={index === images.length - 1 ? lastImageRef : null}
        >
          <ImageCard
            url={image.urls.small}
            alt={image.alt_description}
            onImageClick={() => onImageClick(image)}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;




