export default function GalleryItem({ image, onClick }) {
  return (
    <div
      className="relative group cursor-pointer overflow-hidden rounded-lg"
      onClick={() => onClick && onClick(image)}
    >
      <img
        src={image.image_url}
        alt={image.title}
        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-semibold">{image.title}</h3>
          {image.category && (
            <span className="inline-block bg-pink-500 text-white text-xs px-2 py-1 rounded mt-2">
              {image.category}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
