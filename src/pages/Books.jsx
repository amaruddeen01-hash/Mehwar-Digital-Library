import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Books() {
  const [searchParams] = useSearchParams();

  const authorFromUrl = searchParams.get("author") || "";

  const [search, setSearch] = useState(authorFromUrl);
  const [category, setCategory] = useState("All");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSearch(authorFromUrl);
  }, [authorFromUrl]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "books"));

        const firestoreBooks = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("📚 Firebase Books:", firestoreBooks);

        console.table(
          firestoreBooks.map((book) => ({
            id: book.id,
            title: book.title,
            author: book.author,
            category: book.category,
          }))
        );

        setBooks(firestoreBooks);
      } catch (error) {
        console.error("❌ Firebase Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Dynamic Categories
  const categories = [
    "All",
    ...Array.from(
      new Map(
        books
          .filter((book) => book.category)
          .map((book) => [
            book.category.trim().toLowerCase(),
            book.category.trim(),
          ])
      ).values()
    ).sort((a, b) => a.localeCompare(b)),
  ];

  const filteredBooks = books.filter((book) => {
    const query = search.trim().toLowerCase();

    const searchText = [
      book.title,
      book.author,
      book.category,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const searchMatch =
      query === "" || searchText.includes(query);

    const categoryMatch =
      category === "All" ||
      (book.category || "").trim().toLowerCase() ===
        category.trim().toLowerCase();

    return searchMatch && categoryMatch;
  });

  if (loading) {
    return (
      <div className="text-center p-20">
        <h2>📚 Loading Books...</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-4xl font-bold text-emerald-700">
        📚 Books Library
      </h1>

      <input
        type="text"
        placeholder="Search by title, author, category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mt-6 w-full border rounded-lg p-3"
      />

      <p className="mt-4 text-gray-600">
        Showing {filteredBooks.length} books
      </p>

      <div className="flex flex-wrap gap-3 mt-6">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`px-4 py-2 rounded-lg border transition ${
              category === item
                ? "bg-emerald-700 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="border rounded-xl p-5 shadow hover:shadow-lg transition"
          >
            {book.cover ? (
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-60 object-cover rounded-lg mb-4"
              />
            ) : (
              <div className="h-60 flex items-center justify-center bg-gray-100 rounded-lg mb-4 text-6xl">
                📘
              </div>
            )}

            <h2 className="text-xl font-bold text-emerald-700">
              {book.title}
            </h2>

            <p className="mt-2">
              ✍️ {book.author || "Unknown"}
            </p>

            <p>
              📖 {book.category || "Unknown"}
            </p>

            <Link
              to={`/book/${book.id}`}
              className="inline-block mt-4 bg-emerald-700 text-white px-4 py-2 rounded-lg"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="mt-10 text-center text-gray-600 text-xl">
          📕 No books found
        </div>
      )}

    </div>
  );
}