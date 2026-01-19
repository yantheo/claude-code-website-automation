import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Info */}
          <div>
            <h3 className="text-xl font-bold text-pink-400 mb-4">Manucure Studio</h3>
            <p className="text-gray-400">
              Votre salon de manucure professionnel. Des soins de qualite pour sublimer vos ongles.
            </p>
          </div>

          {/* Horaires */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Horaires</h4>
            <ul className="text-gray-400 space-y-2">
              <li>Lundi - Vendredi : 9h - 19h</li>
              <li>Samedi : 10h - 18h</li>
              <li>Dimanche : Ferme</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="text-gray-400 space-y-2">
              <li>123 Rue de la Beaute</li>
              <li>75001 Paris</li>
              <li>Tel : 01 23 45 67 89</li>
              <li>Email : contact@manucure-studio.fr</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Manucure Studio. Tous droits reserves.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/contact" className="text-gray-400 hover:text-pink-400 transition">
              Contact
            </Link>
            <a href="#" className="text-gray-400 hover:text-pink-400 transition">
              Instagram
            </a>
            <a href="#" className="text-gray-400 hover:text-pink-400 transition">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
