import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function AuthorDetails() {
  const { name } = useParams();

  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "books"));

        const allBooks = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const decodedName = decodeURIComponent(name || "");

        const authorBooks = allBooks.filter(
          (book) =>
            (book.author || "Unknown").trim().toLowerCase() ===
            decodedName.trim().toLowerCase()
        );

        setBooks(authorBooks);

        if (authorBooks.length > 0) {
          const firstBook = authorBooks[0];

          setAuthor({
            name: firstBook.author || decodedName,
            bio: firstBook.authorBio || "",
            birth: firstBook.authorBirth || "",
            death: firstBook.authorDeath || "",
            place: firstBook.authorPlace || "",
            works: firstBook.authorWorks || "",
          });
        } else {
          setAuthor({
            name: decodedName,
            bio: "",
            birth: "",
            death: "",
            place: "",
            works: "",
          });
        }
      } catch (error) {
        console.error("Error loading author:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [name]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-4">👤</div>

        <h2 className="text-xl font-semibold text-gray-700">
          Loading Author...
        </h2>
      </div>
    );
  }

  if (!author) {
    return (
      <div className="text-center py-20 px-4">
        <div className="text-6xl mb-4">😔</div>

        <h1 className="text-2xl font-bold text-gray-800">
          Author Not Found
        </h1>

        <Link
          to="/authors"
          className="inline-block mt-6 bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 rounded-xl"
        >
          👤 Back to Authors
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

      {/* Back */}
      <Link
        to="/authors"
        className="inline-flex items-center text-emerald-700 hover:text-emerald-900 font-semibold mb-6"
      >
        ← Back to Authors
      </Link>

      {/* Author Header */}
      <div className="bg-white border rounded-2xl shadow-lg overflow-hidden">

        <div className="bg-emerald-700 text-white p-8 sm:p-10 text-center">

          <div className="text-7xl mb-4">
            👤
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold">
            {author.name}
          </h1>

          <p className="mt-3 text-emerald-100">
            📚 {books.length}{" "}
            {books.length === 1 ? "Book" : "Books"} in Mehwar Digital Library
          </p>

        </div>

        {/* Author Information */}
        <div className="p-6 sm:p-10">

          <h2 className="text-2xl font-bold text-emerald-700 mb-5">
            📝 Mukammal Taaruf
          </h2>

          {author.bio ? (
            <p className="text-gray-600 leading-8">
              {author.bio}
            </p>
          ) : (
            <div className="bg-gray-50 border rounded-xl p-5">
              <p className="text-gray-600 leading-7">
                Is musannif ka tafseeli taaruf abhi add nahi kiya gaya.
                Jald hi is page par author ki zindagi, ilmī khidmaat aur
                mashhoor tasaneef ke baare mein maloomat shamil ki jayegi.
              </p>
            </div>
          )}

          {/* Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">

            {author.birth && (
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-500">
                  📅 Wiladat
                </p>

                <p className="font-semibold text-gray-800 mt-1">
                  {author.birth}
                </p>
              </div>
            )}

            {author.death && (
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-500">
                  📅 Wafat
                </p>

                <p className="font-semibold text-gray-800 mt-1">
                  {author.death}
                </p>
              </div>
            )}

            {author.place && (
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-500">
                  🌍 Maqam
                </p>

                <p className="font-semibold text-gray-800 mt-1">
                  {author.place}
                </p>
              </div>
            )}

            {author.works && (
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-500">
                  📚 Mashhoor Tasaneef
                </p>

                <p className="font-semibold text-gray-800 mt-1">
                  {author.works}
                </p>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* Author Books */}
      <div className="mt-10">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

          <h2 className="text-2xl sm:text-3xl font-bold text-emerald-700">
            📚 Is Musannif Ki Kitaben
          </h2>

          <span className="text-gray-500">
            {books.length}{" "}
            {books.length === 1 ? "Book" : "Books"}
          </span>

        </div>

        {books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {books.map((book) => (
              <div
                key={book.id}
                className="bg-white border rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
              >

                {/* Cover */}
                <div className="h-64 bg-gray-100 flex items-center justify-center overflow-hidden">

                  {book.cover ? (
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-7xl">
                      📘
                    </div>
                  )}

                </div>

                {/* Book Info */}
                <div className="p-5">

                  <h3 className="text-xl font-bold text-gray-800 line-clamp-2">
                    {book.title || "Untitled Book"}
                  </h3>

                  {book.category && (
                    <p className="text-sm text-emerald-700 mt-2">
                      📚 {book.category}
                    </p>
                  )}

                  {book.language && (
                    <p className="text-sm text-gray-500 mt-2">
                      🌐 {book.language}
                    </p>
                  )}

                  <Link
                    to={`/book/${book.id}`}
                    className="block text-center bg-emerald-700 hover:bg-emerald-800 text-white py-3 rounded-xl font-semibold mt-5 transition"
                  >
                    📖 View Book
                  </Link>

                </div>
              </div>
            ))}

          </div>
        ) : (
          <div className="bg-white border rounded-2xl p-8 text-center text-gray-600">
            Is author ki koi kitab abhi library mein available nahi hai.
          </div>
        )}

      </div>

    </div>
  );
}