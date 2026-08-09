import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function BookCard({ book }) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const favorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    setFavorite(favorites.includes(book.id));
  }, [book.id]);

  const toggleFavorite = () => {
    let favorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.includes(book.id)) {
      favorites = favorites.filter((id) => id !== book.id);
      setFavorite(false);
    } else {
      favorites.push(book.id);
      setFavorite(true);
    }

    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border">

      <div className="relative h-72 bg-gray-100 flex items-center justify-center">

        {book.cover ? (
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-7xl">📘</span>
        )}

        <button
          onClick={toggleFavorite}
          className="absolute top-3 right-3 text-3xl bg-white rounded-full w-12 h-12 shadow hover:scale-110 transition"
          title="Favorite"
        >
          {favorite ? "❤️" : "🤍"}
        </button>

      </div>

      <div className="p-5">

        <span className="inline-block bg-emerald-100 text-emerald-700 text-sm px-3 py-1 rounded-full mb-3">
          {book.category || "Unknown"}
        </span>

        <h2 className="text-xl font-bold text-gray-800 line-clamp-2">
          {book.title}
        </h2>

        <p className="mt-2 text-gray-600">
          👤 {book.author || "Unknown"}
        </p>

        <p className="mt-2 text-gray-500 text-sm">
          🌐 {book.language || "Unknown"}
        </p>

        <div className="flex justify-between mt-4 text-sm text-gray-500">
          <span>⭐ {book.rating || 0}</span>
          <span>⬇️ {book.downloads || 0}</span>
        </div>

        <p className="mt-4 text-gray-600 text-sm">
          {book.description
            ? `${book.description.substring(0, 120)}...`
            : "No description available."}
        </p>

        <Link
          to={`/book/${book.id}`}
          className="block mt-6 text-center bg-emerald-700 hover:bg-emerald-800 text-white py-3 rounded-xl font-semibold transition"
        >
          📖 View Details
        </Link>

      </div>

    </div>
  );
}