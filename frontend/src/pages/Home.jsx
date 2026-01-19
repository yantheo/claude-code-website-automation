import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import GalleryItem from '../components/GalleryItem';
import { getServices, getFeaturedGallery } from '../services/api';

export default function Home() {
  const [services, setServices] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, galleryRes] = await Promise.all([
          getServices(),
          getFeaturedGallery(),
        ]);
        setServices(servicesRes.data.slice(0, 3));
        setGallery(galleryRes.data.slice(0, 6));
      } catch (error) {
        console.error('Erreur lors du chargement des donnees:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Hero />

      {/* A propos */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Bienvenue chez Manucure Studio</h2>
            <p className="text-gray-600 mb-4">
              Notre salon vous accueille dans un cadre elegant et relaxant pour vous offrir des soins
              de manucure et pedicure d'exception. Notre equipe de professionnelles passionnees met
              tout son savoir-faire a votre service.
            </p>
            <p className="text-gray-600">
              Que vous souhaitiez une manucure classique, une pose de gel, ou un nail art creatif,
              nous avons la prestation qu'il vous faut.
            </p>
          </div>
        </div>
      </section>

      {/* Services populaires */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Nos Services Populaires</h2>
            <p className="text-gray-600">Decouvrez nos prestations les plus demandees</p>
          </div>

          {loading ? (
            <div className="text-center text-gray-500">Chargement...</div>
          ) : services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">Aucun service disponible pour le moment</div>
          )}

          <div className="text-center mt-8">
            <Link
              to="/services"
              className="inline-block bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Voir tous nos services
            </Link>
          </div>
        </div>
      </section>

      {/* Galerie miniature */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Nos Realisations</h2>
            <p className="text-gray-600">Admirez le travail de nos artistes</p>
          </div>

          {loading ? (
            <div className="text-center text-gray-500">Chargement...</div>
          ) : gallery.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.map((image) => (
                <GalleryItem key={image.id} image={image} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">Galerie bientot disponible</div>
          )}

          <div className="text-center mt-8">
            <Link
              to="/gallery"
              className="inline-block border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Voir la galerie complete
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Prete a sublimer vos ongles ?</h2>
          <p className="text-pink-100 mb-8 max-w-2xl mx-auto">
            Prenez rendez-vous des maintenant et laissez-nous prendre soin de vous
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-pink-600 hover:bg-pink-50 px-8 py-3 rounded-lg font-semibold transition"
          >
            Prendre Rendez-vous
          </Link>
        </div>
      </section>
    </div>
  );
}
