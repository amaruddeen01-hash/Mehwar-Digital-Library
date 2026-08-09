import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export default function Admin() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    const snapshot = await getDocs(collection(db, "books"));

    const booksData = snapshot.docs.map((item) => ({
      firestoreId: item.id,
      ...item.data(),
    }));

    setBooks(booksData);
  };

  const deleteBook = async (id) => {
    const ok = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!ok) return;

    await deleteDoc(doc(db, "books", id));

    setBooks((prev) =>
      prev.filter((book) => book.firestoreId !== id)
    );
  };

  const toggleFeatured = async (book) => {
    try {
      await updateDoc(doc(db, "books", book.firestoreId), {
        featured: !book.featured,
      });

      setBooks((prev) =>
        prev.map((b) =>
          b.firestoreId === book.firestoreId
            ? { ...b, featured: !b.featured }
            : b
        )
      );
    } catch (error) {
      console.error(error);
      alert("Error updating featured status.");
    }
  };

  const filteredBooks = books.filter((book) => {
    const text = `
      ${book.title || ""}
      ${book.author || ""}
      ${book.category || ""}
      ${book.language || ""}
    `
      .toLowerCase();

    return text.includes(search.toLowerCase().trim());
  });

  const totalAuthors = new Set(
    books
      .map((b) => (b.author || "").trim().toLowerCase())
      .filter(Boolean)
  ).size;

  const totalCategories = new Set(
    books
      .map((b) => (b.category || "").trim().toLowerCase())
      .filter(Boolean)
  ).size;

  const featuredBooks = books.filter((b) => b.featured).length;

  return (
    <div className="max-w-7xl mx-auto p-6">

      <div className="flex justify-between items-center flex-wrap gap-4">

        <h1 className="text-4xl font-bold text-emerald-700">
          🛠 Admin Dashboard
        </h1>

        <button
          onClick={loadBooks}
          className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-3 rounded-lg"
        >
          🔄 Refresh
        </button>

      </div>


      <div className="grid md:grid-cols-4 gap-6 mt-8">

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-4xl font-bold text-emerald-700">
            {books.length}
          </h2>
          <p>Total Books</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-4xl font-bold text-blue-600">
            {totalAuthors}
          </h2>
          <p>Authors</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-4xl font-bold text-purple-600">
            {totalCategories}
          </h2>
          <p>Categories</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-4xl font-bold text-yellow-500">
            {featuredBooks}
          </h2>
          <p>Featured Books</p>
        </div>

      </div>


      <div className="flex flex-wrap justify-between items-center gap-4 mt-8">


        <div className="flex gap-3 flex-wrap">

          <Link
            to="/admin/add-book"
            className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 rounded-lg font-semibold"
          >
            ➕ Add New Book
          </Link>


          <Link
            to="/admin/bulk-upload"
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold"
          >
            📚 Bulk Upload Books
          </Link>

        </div>


        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg p-3 w-80"
        />

      </div>


      <p className="mt-4 text-gray-600">
        Showing <strong>{filteredBooks.length}</strong> of{" "}
        <strong>{books.length}</strong> books
      </p>


      <div className="overflow-x-auto mt-6">

        <table className="w-full border">

          <thead className="bg-emerald-700 text-white">

            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Author</th>
              <th className="p-3">Category</th>
              <th className="p-3">Featured</th>
              <th className="p-3">Actions</th>
            </tr>

          </thead>


          <tbody>

            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (

                <tr key={book.firestoreId} className="border-b hover:bg-gray-50">

                  <td className="p-3">{book.title}</td>

                  <td className="p-3">{book.author}</td>

                  <td className="p-3">{book.category}</td>


                  <td className="p-3 text-center">

                    <button
                      onClick={() => toggleFeatured(book)}
                      className={`px-4 py-2 rounded-lg text-white ${
                        book.featured
                          ? "bg-yellow-500 hover:bg-yellow-600"
                          : "bg-gray-500 hover:bg-gray-600"
                      }`}
                    >
                      {book.featured ? "⭐ Featured" : "☆ Feature"}
                    </button>

                  </td>


                  <td className="p-3">

                    <div className="flex justify-center gap-2">

                      <Link
                        to={`/admin/edit-book/${book.firestoreId}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                      >
                        ✏ Edit
                      </Link>


                      <button
                        onClick={() => deleteBook(book.firestoreId)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                      >
                        🗑 Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-10">
                  📕 No books found.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}