export interface ImageData {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
  likes?: number;
  downloads?: number;
  views?: number;
}

export interface ModalImage {
  src: string;
  alt: string;
}

