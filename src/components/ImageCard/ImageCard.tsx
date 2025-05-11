import css from './ImageCard.module.css';

interface ImageCardProps {
  url: string;
  alt: string;
  onImageClick: () => void;
}

const ImageCard = ({ url, alt, onImageClick }: ImageCardProps) => {
  return (
    <div className={css.card}>
      <img
        src={url}
        alt={alt}
        className={css.image}
        loading="lazy"
        onClick={onImageClick}
      />
    </div>
  );
};

export default ImageCard;

