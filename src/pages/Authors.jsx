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
              bio: book.authorBio || "",
            };
          }

          authorMap[author].count += 1;

          // Agar kisi book me authorBio mila ho
          if (!authorMap[author].bio && book.authorBio) {
            authorMap[author].bio = book.authorBio;
          }
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
        <div className="text-5xl mb-4">👤</div>

        <h2 className="text-xl font-semibold text-gray-700">
          Loading Authors...
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

      {/* Header */}
      <div className="text-center">
        <div className="text-6xl mb-4">👤</div>

        <h1 className="text-3xl sm:text-4xl font-bold text-emerald-700">
          Authors
        </h1>

        <p className="mt-3 text-gray-600">
          Library mein maujood musannifeen aur unki kitaben
        </p>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto mt-8">
        <input
          type="text"
          placeholder="🔎 Search author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Count */}
      <p className="mt-6 text-gray-600 text-center">
        Showing{" "}
        <span className="font-bold text-emerald-700">
          {filteredAuthors.length}
        </span>{" "}
        authors
      </p>

      {/* Authors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

        {filteredAuthors.map((author) => (
          <div
            key={author.name}
            className="bg-white border rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
          >

            {/* Author Icon */}
            <div className="bg-emerald-50 py-7 text-center">
              <div className="text-6xl">
                👤
              </div>
            </div>

            <div className="p-6">

              {/* Name */}
              <h2 className="text-xl font-bold text-center text-emerald-700">
                {author.name}
              </h2>

              {/* Book Count */}
              <p className="text-center text-gray-500 mt-2">
                📚 {author.count}{" "}
                {author.count === 1 ? "Book" : "Books"}
              </p>

              {/* Short Introduction */}
              <div className="mt-5 bg-gray-50 rounded-xl p-4">

                <h3 className="font-semibold text-gray-800 mb-2">
                  📝 Mukhtasar Taaruf
                </h3>

                <p className="text-sm text-gray-600 leading-6">
                  {author.bio
                    ? `${author.bio.substring(0, 150)}${
                        author.bio.length > 150 ? "..." : ""
                      }`
                    : "Is musannif ka mukhtasar taaruf jald add kiya jayega."}
                </p>

              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3 mt-5">

                <Link
                  to={`/author/${encodeURIComponent(author.name)}`}
                  className="text-center bg-emerald-700 hover:bg-emerald-800 text-white py-3 rounded-xl font-semibold transition"
                >
                  📖 Mukammal Taaruf
                </Link>

                <Link
                  to={`/books?author=${encodeURIComponent(author.name)}`}
                  className="text-center border border-emerald-700 text-emerald-700 hover:bg-emerald-50 py-3 rounded-xl font-semibold transition"
                >
                  📚 Is Musannif Ki Kitaben
                </Link>

              </div>

            </div>
          </div>
        ))}

      </div>

      {/* No Authors */}
      {filteredAuthors.length === 0 && (
        <div className="mt-12 text-center text-gray-600 text-xl">
          😔 No authors found.
        </div>
      )}

    </div>
  );
}