export default function ServiceCard({ service }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {service.image_url && (
        <div className="h-48 bg-gray-200">
          <img
            src={service.image_url}
            alt={service.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      {!service.image_url && (
        <div className="h-48 bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center">
          <svg className="w-16 h-16 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.name}</h3>
        {service.description && (
          <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>
        )}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-pink-600">{service.price} EUR</span>
            {service.duration && (
              <span className="text-gray-500 text-sm ml-2">({service.duration} min)</span>
            )}
          </div>
          <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition">
            Reserver
          </button>
        </div>
      </div>
    </div>
  );
}
