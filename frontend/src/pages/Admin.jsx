import { useState, useEffect } from 'react';
import { getServices, getContacts, getGallery } from '../services/api';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('services');
  const [services, setServices] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [servicesRes, contactsRes, galleryRes] = await Promise.all([
          getServices(),
          getContacts(),
          getGallery(),
        ]);
        setServices(servicesRes.data);
        setContacts(contactsRes.data);
        setGallery(galleryRes.data);
      } catch (error) {
        console.error('Erreur lors du chargement des donnees:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const tabs = [
    { id: 'services', label: 'Services', count: services.length },
    { id: 'gallery', label: 'Galerie', count: gallery.length },
    { id: 'contacts', label: 'Messages', count: contacts.filter(c => c.status === 'new').length },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-800">Administration</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                  activeTab === tab.id
                    ? 'border-pink-500 text-pink-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    activeTab === tab.id ? 'bg-pink-100 text-pink-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
          </div>
        ) : (
          <>
            {activeTab === 'services' && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">Gestion des Services</h2>
                  <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm">
                    + Ajouter un service
                  </button>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prix</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duree</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {services.map((service) => (
                      <tr key={service.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{service.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{service.price} EUR</td>
                        <td className="px-6 py-4 whitespace-nowrap">{service.duration} min</td>
                        <td className="px-6 py-4 whitespace-nowrap space-x-2">
                          <button className="text-pink-600 hover:text-pink-900">Modifier</button>
                          <button className="text-red-600 hover:text-red-900">Supprimer</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {services.length === 0 && (
                  <div className="text-center py-8 text-gray-500">Aucun service</div>
                )}
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">Gestion de la Galerie</h2>
                  <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm">
                    + Ajouter une image
                  </button>
                </div>
                <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {gallery.map((image) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.image_url}
                        alt={image.title}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition rounded-lg flex items-center justify-center space-x-2">
                        <button className="bg-white text-gray-800 p-2 rounded-full text-sm">Modifier</button>
                        <button className="bg-red-500 text-white p-2 rounded-full text-sm">Supprimer</button>
                      </div>
                    </div>
                  ))}
                </div>
                {gallery.length === 0 && (
                  <div className="text-center py-8 text-gray-500">Aucune image</div>
                )}
              </div>
            )}

            {activeTab === 'contacts' && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b">
                  <h2 className="text-lg font-semibold text-gray-800">Messages de Contact</h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {contacts.map((contact) => (
                    <div key={contact.id} className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-800">{contact.name}</h3>
                            <span className={`px-2 py-0.5 rounded-full text-xs ${
                              contact.status === 'new' ? 'bg-green-100 text-green-700' :
                              contact.status === 'read' ? 'bg-blue-100 text-blue-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {contact.status === 'new' ? 'Nouveau' :
                               contact.status === 'read' ? 'Lu' : 'Repondu'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">{contact.email} | {contact.phone || 'Pas de telephone'}</p>
                        </div>
                        <span className="text-sm text-gray-400">
                          {new Date(contact.created_at).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <p className="mt-2 text-gray-600">{contact.message}</p>
                    </div>
                  ))}
                </div>
                {contacts.length === 0 && (
                  <div className="text-center py-8 text-gray-500">Aucun message</div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
