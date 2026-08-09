import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Authors() {
  const [authors, setAuthors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "books"));

        const books = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const authorMap = {};

        books.forEach((book) => {
          const author = (book.author || "Unknown").trim();

          if (!authorMap[author]) {
            authorMap[author] = {
              name: author,
              count: 0,
            };
          }

          authorMap[author].count += 1;
        });

        const authorList = Object.values(authorMap).sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setAuthors(authorList);
      } catch (error) {
        console.error("Error loading authors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  const filteredAuthors = authors.filter((author) =>
    author.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center p-20">
        <h2>👤 Loading Authors...</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-emerald-700">
        👤 Authors
      </h1>

      <input
        type="text"
        placeholder="Search author..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mt-6 w-full border rounded-lg p-3"
      />

      <p className="mt-4 text-gray-600">
        Showing {filteredAuthors.length} authors
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {filteredAuthors.map((author) => (
          <Link
            key={author.name}
            to={`/books?author=${encodeURIComponent(author.name)}`}
            className="border rounded-xl p-5 shadow hover:shadow-lg transition bg-white"
          >
            <div className="text-5xl text-center">👤</div>

            <h2 className="text-xl font-bold text-center mt-4 text-emerald-700">
              {author.name}
            </h2>

            <p className="text-center text-gray-600 mt-2">
              📚 {author.count} Book{author.count > 1 ? "s" : ""}
            </p>
          </Link>
        ))}
      </div>

      {filteredAuthors.length === 0 && (
        <div className="mt-10 text-center text-gray-600 text-xl">
          No authors found.
        </div>
      )}
    </div>
  );
}