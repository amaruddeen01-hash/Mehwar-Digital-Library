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

    // Author Information
    authorBio: "",
    authorBirth: "",
    authorDeath: "",
    authorPlace: "",
    authorWorks: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBook = async () => {
      try {
        const docRef = doc(db, "books", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBook({
            ...book,
            ...docSnap.data(),
          });
        } else {
          alert("Book not found");
          navigate("/admin");
        }
      } catch (error) {
        console.error("Error loading book:", error);
        alert("❌ Error loading book");
      } finally {
        setLoading(false);
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
        year: book.year ? Number(book.year) : 0,
        pages: book.pages ? Number(book.pages) : 0,
      });

      alert("✅ Book Updated Successfully");
      navigate("/admin");
    } catch (error) {
      console.error(error);
      alert("❌ Error updating book");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-4">📚</div>
        <h2 className="text-xl font-semibold text-gray-700">
          Loading Book...
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">

      <h1 className="text-3xl sm:text-4xl font-bold text-emerald-700">
        ✏️ Edit Book
      </h1>

      <p className="text-gray-500 mt-2">
        Book aur author ki information update karein.
      </p>

      <form
        onSubmit={updateBook}
        className="mt-8 space-y-8"
      >

        {/* ================= BOOK INFORMATION ================= */}

        <div className="bg-white border rounded-2xl shadow-sm p-6">

          <h2 className="text-2xl font-bold text-emerald-700 mb-6">
            📚 Book Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              name="title"
              value={book.title || ""}
              onChange={handleChange}
              placeholder="Book Title"
              className="w-full border p-3 rounded-lg"
            />

            <input
              name="author"
              value={book.author || ""}
              onChange={handleChange}
              placeholder="Author Name"
              className="w-full border p-3 rounded-lg"
            />

            <input
              name="category"
              value={book.category || ""}
              onChange={handleChange}
              placeholder="Category"
              className="w-full border p-3 rounded-lg"
            />

            <input
              name="language"
              value={book.language || ""}
              onChange={handleChange}
              placeholder="Language"
              className="w-full border p-3 rounded-lg"
            />

            <input
              name="publisher"
              value={book.publisher || ""}
              onChange={handleChange}
              placeholder="Publisher"
              className="w-full border p-3 rounded-lg"
            />

            <input
              name="year"
              type="number"
              value={book.year || ""}
              onChange={handleChange}
              placeholder="Publication Year"
              className="w-full border p-3 rounded-lg"
            />

            <input
              name="pages"
              type="number"
              value={book.pages || ""}
              onChange={handleChange}
              placeholder="Pages"
              className="w-full border p-3 rounded-lg"
            />

          </div>

          <div className="mt-4 space-y-4">

            <input
              name="cover"
              value={book.cover || ""}
              onChange={handleChange}
              placeholder="Cover Image URL"
              className="w-full border p-3 rounded-lg"
            />

            <input
              name="pdf"
              value={book.pdf || ""}
              onChange={handleChange}
              placeholder="PDF URL / Path"
              className="w-full border p-3 rounded-lg"
            />

            <textarea
              name="description"
              value={book.description || ""}
              onChange={handleChange}
              placeholder="Book Description"
              rows="5"
              className="w-full border p-3 rounded-lg"
            />

          </div>
        </div>

        {/* ================= AUTHOR INFORMATION ================= */}

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">

          <h2 className="text-2xl font-bold text-emerald-700 mb-2">
            👤 Author Information
          </h2>

          <p className="text-gray-600 mb-6 leading-6">
            Yahan author ka taaruf aur basic information likhein.
            Ye information Author Details page par dikhai jayegi.
          </p>

          <div className="space-y-4">

            {/* Bio */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                📝 Mukammal Taaruf
              </label>

              <textarea
                name="authorBio"
                value={book.authorBio || ""}
                onChange={handleChange}
                placeholder="Author ka mukhtasar ya tafseeli taaruf..."
                rows="7"
                className="w-full border p-3 rounded-lg bg-white"
              />
            </div>

            {/* Birth / Death */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  📅 Wiladat
                </label>

                <input
                  name="authorBirth"
                  value={book.authorBirth || ""}
                  onChange={handleChange}
                  placeholder="Misal: 194 AH"
                  className="w-full border p-3 rounded-lg bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  📅 Wafat
                </label>

                <input
                  name="authorDeath"
                  value={book.authorDeath || ""}
                  onChange={handleChange}
                  placeholder="Misal: 256 AH"
                  className="w-full border p-3 rounded-lg bg-white"
                />
              </div>

            </div>

            {/* Place */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                🌍 Maqam / Nisbat
              </label>

              <input
                name="authorPlace"
                value={book.authorPlace || ""}
                onChange={handleChange}
                placeholder="Author ka maqam ya nisbat"
                className="w-full border p-3 rounded-lg bg-white"
              />
            </div>

            {/* Famous Works */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                📚 Mashhoor Tasaneef
              </label>

              <textarea
                name="authorWorks"
                value={book.authorWorks || ""}
                onChange={handleChange}
                placeholder="Author ki mashhoor kitabon ke naam..."
                rows="4"
                className="w-full border p-3 rounded-lg bg-white"
              />
            </div>

          </div>
        </div>

        {/* ================= BUTTONS ================= */}

        <div className="flex flex-col sm:flex-row gap-3">

          <button
            type="submit"
            className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            ✅ Update Book & Author
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold transition"
          >
            Cancel
          </button>

        </div>

      </form>
    </div>
  );
}