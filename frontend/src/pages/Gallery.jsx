import { useState, useEffect } from 'react';
import GalleryItem from '../components/GalleryItem';
import { getGallery } from '../services/api';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    { value: null, label: 'Tous' },
    { value: 'nail-art', label: 'Nail Art' },
    { value: 'french', label: 'French' },
    { value: 'gel', label: 'Gel' },
    { value: 'extension', label: 'Extensions' },
    { value: 'soin', label: 'Soins' },
  ];

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      try {
        const response = await getGallery(filter);
        setImages(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement de la galerie:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [filter]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Notre Galerie</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Admirez nos plus belles realisations et laissez-vous inspirer
          </p>
        </div>
      </section>

      {/* Filtres */}
      <section className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.value || 'all'}
                onClick={() => setFilter(category.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  filter === category.value
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grille d'images */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
              <p className="text-gray-500 mt-4">Chargement de la galerie...</p>
            </div>
          ) : images.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((image) => (
                <GalleryItem key={image.id} image={image} onClick={handleImageClick} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Aucune image dans cette categorie</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-pink-400 transition"
            onClick={closeLightbox}
          >
            &times;
          </button>
          <div className="max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.image_url}
              alt={selectedImage.title}
              className="max-w-full max-h-[80vh] object-contain"
            />
            <div className="text-white text-center mt-4">
              <h3 className="text-xl font-semibold">{selectedImage.title}</h3>
              {selectedImage.category && (
                <span className="inline-block bg-pink-500 text-white text-sm px-3 py-1 rounded mt-2">
                  {selectedImage.category}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
