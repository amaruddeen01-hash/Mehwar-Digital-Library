import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "",
    language: "",
    publisher: "",
    year: "",
    pages: "",
    cover: "",
    pdf: "",
    description: "",
  });

  useEffect(() => {
    const loadBook = async () => {
      const docRef = doc(db, "books", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setBook(docSnap.data());
      } else {
        alert("Book not found");
        navigate("/admin");
      }
    };

    loadBook();
  }, [id, navigate]);

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const updateBook = async (e) => {
    e.preventDefault();

    try {
      await updateDoc(doc(db, "books", id), {
        ...book,
        year: Number(book.year),
        pages: Number(book.pages),
      });

      alert("✅ Book Updated Successfully");
      navigate("/admin");
    } catch (error) {
      console.error(error);
      alert("❌ Error updating book");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-emerald-700">
        ✏️ Edit Book
      </h1>

      <form onSubmit={updateBook} className="mt-8 space-y-4">
        {[
          "title",
          "author",
          "category",
          "language",
          "publisher",
          "year",
          "pages",
          "cover",
          "pdf",
        ].map((field) => (
          <input
            key={field}
            name={field}
            value={book[field] || ""}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
        ))}

        <textarea
          name="description"
          value={book.description || ""}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <button className="bg-emerald-700 text-white px-6 py-3 rounded-lg">
          Update Book
        </button>
      </form>
    </div>
  );
}