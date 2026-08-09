import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import BookCard from "../components/BookCard";

export default function Favorites() {
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favoriteIds =
          JSON.parse(localStorage.getItem("favorites")) || [];

        const snapshot = await getDocs(collection(db, "books"));

        const books = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const filtered = books.filter((book) =>
          favoriteIds.includes(book.id)
        );

        setFavoriteBooks(filtered);
      } catch (error) {
        console.error("Error loading favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-bold">
          Loading Favorites...
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-4xl font-bold text-emerald-700 mb-2">
        ❤️ My Favorite Books
      </h1>

      <p className="text-gray-600 mb-8">
        Total Favorites: <strong>{favoriteBooks.length}</strong>
      </p>

      {favoriteBooks.length === 0 ? (
        <div className="text-center mt-20">
          <div className="text-7xl">📚</div>

          <h2 className="text-2xl font-bold mt-4">
            No Favorite Books
          </h2>

          <p className="text-gray-600 mt-2">
            Click the ❤️ icon on any book to add it to your favorites.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
            />
          ))}
        </div>
      )}

    </div>
  );
}