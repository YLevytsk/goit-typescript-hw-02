import { useState, useEffect, useRef } from 'react';
import { FaRegSurprise } from 'react-icons/fa';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ImageModal from './components/ImageModal/ImageModal';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import css from './App.module.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageData } from './types';

const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;


function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState<ImageData[]>([]);
  const [page, setPage] = useState(1);
  const [totalPhotos, setTotalPhotos] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const lastImageRef = useRef<HTMLLIElement | null>(null);

  const handleSearch = (newQuery: string) => {
    if (newQuery.trim() === '') return;
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setError(null);
    setTotalPhotos(0);
  };

  const handleImageClick = (image: ImageData) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleLoadMore = () => {
    if (page * 12 < totalPhotos) {
      setPage(prev => prev + 1);
    }
  };

  const scrollToLastImage = () => {
    if (lastImageRef.current) {
      lastImageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${query}&orientation=landscape&per_page=12&page=${page}&client_id=${ACCESS_KEY}`
        );
        const data = await response.json();

        if (data.results.length === 0) {
          setError('Нічого не знайдено. Спробуйте інший запит!');
          return;
        }

        setTotalPhotos(data.total);
        setImages(prev => (page === 1 ? data.results : [...prev, ...data.results]));

        if (page > 1) setTimeout(scrollToLastImage, 300);
      } catch (err) {
        console.error('Помилка завантаження:', err);
        setError('Сталася помилка. Спробуйте ще раз!');
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const isMaxReached = page * 12 >= totalPhotos;

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSearch} />

      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <ImageGallery
            images={images}
            lastImageRef={lastImageRef}
            onImageClick={handleImageClick}
          />

          {isLoading && <Loader />}

          {!isLoading && images.length > 0 && !isMaxReached && (
            <LoadMoreBtn onClick={handleLoadMore} />
          )}

          {!isLoading && images.length > 0 && isMaxReached && (
            <p className={css.end}>
              Усі зображення завантажено
              <FaRegSurprise
                style={{
                  fontSize: '30px',
                  marginLeft: '10px',
                  verticalAlign: 'middle',
                }}
              />
            </p>
          )}
        </>
      )}

<ImageModal
  isOpen={!!selectedImage}
  onRequestClose={closeModal}
  image={
    selectedImage
      ? {
          ...selectedImage,
          src: selectedImage.urls.regular,
          likes: selectedImage.likes ?? 0,
          downloads: selectedImage.downloads ?? 0,
          views: selectedImage.views ?? 0,
        }
      : null
  }
/>



      <ToastContainer />
    </div>
  );
}

export default App;






