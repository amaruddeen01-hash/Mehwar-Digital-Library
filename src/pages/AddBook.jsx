import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function AddBook() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "",
    language: "",
    publisher: "",
    year: "",
    pages: "",
    description: "",
    cover: "",
    pdf: "",
    featured: false,
    popular: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setBook((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!book.title.trim()) {
      alert("Book Title is required.");
      return;
    }

    if (!book.author.trim()) {
      alert("Author is required.");
      return;
    }

    if (!book.category.trim()) {
      alert("Category is required.");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "books"), {
        title: book.title.trim(),
        author: book.author.trim(),
        category: book.category.trim(),
        language: book.language.trim(),
        publisher: book.publisher.trim(),
        year: book.year ? Number(book.year) : null,
        pages: book.pages ? Number(book.pages) : null,
        description: book.description.trim(),

        cover: book.cover
          ? `/covers/${book.cover.trim()}`
          : "",

        pdf: book.pdf
          ? `/pdf/${book.pdf.trim()}`
          : "",

        rating: 0,
        downloads: 0,
        featured: book.featured,
        popular: book.popular,
        createdAt: new Date(),
      });

      alert("✅ Book Added Successfully");

      navigate("/admin");
    } catch (error) {
      console.error("ADD BOOK ERROR:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link
        to="/admin"
        className="text-emerald-700 font-bold"
      >
        ← Back to Admin
      </Link>

      <h1 className="text-4xl font-bold text-emerald-700 mt-6">
        ➕ Add New Book
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-8 bg-white shadow-lg rounded-xl p-6 space-y-5"
      >
        <input
          name="title"
          value={book.title}
          onChange={handleChange}
          placeholder="Book Title *"
          className="w-full border rounded-lg p-3"
        />

        <input
          name="author"
          value={book.author}
          onChange={handleChange}
          placeholder="Author *"
          className="w-full border rounded-lg p-3"
        />

        <input
          name="category"
          value={book.category}
          onChange={handleChange}
          placeholder="Category *"
          className="w-full border rounded-lg p-3"
        />

        <input
          name="language"
          value={book.language}
          onChange={handleChange}
          placeholder="Language"
          className="w-full border rounded-lg p-3"
        />

        <input
          name="publisher"
          value={book.publisher}
          onChange={handleChange}
          placeholder="Publisher"
          className="w-full border rounded-lg p-3"
        />

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="number"
            name="year"
            value={book.year}
            onChange={handleChange}
            placeholder="Year"
            className="w-full border rounded-lg p-3"
          />

          <input
            type="number"
            name="pages"
            value={book.pages}
            onChange={handleChange}
            placeholder="Pages"
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">
            📷 Cover File Name
          </label>

          <input
            type="text"
            name="cover"
            value={book.cover}
            onChange={handleChange}
            placeholder="example: bukhari.jpg"
            className="w-full border rounded-lg p-3"
          />

          <p className="text-sm text-gray-500 mt-1">
            File ko <b>public/covers/</b> folder me rakhein.
          </p>
        </div>

        <div>
          <label className="block font-semibold mb-2">
            📄 PDF File Name
          </label>

          <input
            type="text"
            name="pdf"
            value={book.pdf}
            onChange={handleChange}
            placeholder="example: sahih-bukhari.pdf"
            className="w-full border rounded-lg p-3"
          />

          <p className="text-sm text-gray-500 mt-1">
            File ko <b>public/pdf/</b> folder me rakhein.
          </p>
        </div>

        <textarea
          name="description"
          value={book.description}
          onChange={handleChange}
          placeholder="Book Description"
          rows={5}
          className="w-full border rounded-lg p-3"
        />

        <div className="grid md:grid-cols-2 gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="featured"
              checked={book.featured}
              onChange={handleChange}
            />
            Featured Book
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="popular"
              checked={book.popular}
              onChange={handleChange}
            />
            Popular Book
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-3 rounded-lg font-bold disabled:opacity-50"
        >
          {loading ? "Saving..." : "💾 Save Book"}
        </button>
      </form>
    </div>
  );
}