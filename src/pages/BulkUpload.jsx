import { useState } from "react";
import { Link } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function BulkUpload() {
  const [loading, setLoading] = useState(false);

  const [books, setBooks] = useState([
    {
      title: "",
      author: "",
      category: "",
      language: "Urdu",
      publisher: "",
      year: "",
      pages: "",
      description: "",
      pdf: "",
    },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...books];
    updated[index][field] = value;
    setBooks(updated);
  };

  const addRow = () => {
    setBooks([
      ...books,
      {
        title: "",
        author: "",
        category: "",
        language: "Urdu",
        publisher: "",
        year: "",
        pages: "",
        description: "",
        pdf: "",
      },
    ]);
  };

  const removeRow = (index) => {
    const updated = books.filter((_, i) => i !== index);
    setBooks(updated);
  };

  const importBooks = async () => {
    try {
      setLoading(true);

      for (const book of books) {
        if (!book.title || !book.pdf) continue;

        await addDoc(collection(db, "books"), {
          title: book.title.trim(),
          author: book.author.trim(),
          category: book.category.trim(),
          language: book.language.trim(),
          publisher: book.publisher.trim(),
          year: book.year ? Number(book.year) : null,
          pages: book.pages ? Number(book.pages) : null,
          description: book.description.trim(),

          cover: "/covers/default-cover.png",
          pdf: `/pdf/${book.pdf}`,

          rating: 0,
          downloads: 0,
          featured: false,
          popular: false,
          createdAt: new Date(),
        });
      }

      alert("✅ Books Imported Successfully");

    } catch (error) {
      console.error(error);
      alert("❌ Import Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">

      <Link
        to="/admin"
        className="text-emerald-700 font-bold"
      >
        ← Back to Admin
      </Link>

      <h1 className="text-4xl font-bold mt-6 text-emerald-700">
        📚 Bulk Upload Books
      </h1>

      <p className="mt-3 text-gray-600">
        PDF file name example:
        <br />
        <b>ahlullah-ki-namaz.pdf</b>
      </p>

      <div className="overflow-auto mt-8">

        <table className="w-full border">

          <thead className="bg-emerald-700 text-white">

            <tr>
              <th className="p-2">Title</th>
              <th className="p-2">Author</th>
              <th className="p-2">Category</th>
              <th className="p-2">Language</th>
              <th className="p-2">PDF File</th>
              <th className="p-2">Delete</th>
            </tr>

          </thead>

          <tbody>

            {books.map((book, index) => (

              <tr key={index}>

                <td>
                  <input
                    value={book.title}
                    onChange={(e) =>
                      handleChange(index, "title", e.target.value)
                    }
                    className="border p-2 w-full"
                  />
                </td>

                <td>
                  <input
                    value={book.author}
                    onChange={(e) =>
                      handleChange(index, "author", e.target.value)
                    }
                    className="border p-2 w-full"
                  />
                </td>

                <td>
                  <input
                    value={book.category}
                    onChange={(e) =>
                      handleChange(index, "category", e.target.value)
                    }
                    className="border p-2 w-full"
                  />
                </td>

                <td>
                  <input
                    value={book.language}
                    onChange={(e) =>
                      handleChange(index, "language", e.target.value)
                    }
                    className="border p-2 w-full"
                  />
                </td>

                <td>
                  <input
                    placeholder="example.pdf"
                    value={book.pdf}
                    onChange={(e) =>
                      handleChange(index, "pdf", e.target.value)
                    }
                    className="border p-2 w-full"
                  />
                </td>

                <td className="text-center">
                  <button
                    onClick={() => removeRow(index)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    X
                  </button>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="mt-6 flex gap-4">

        <button
          onClick={addRow}
          className="bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          ➕ Add Row
        </button>

        <button
          onClick={importBooks}
          disabled={loading}
          className="bg-emerald-700 text-white px-5 py-3 rounded-lg"
        >
          {loading ? "Importing..." : "🚀 Import All Books"}
        </button>

      </div>

    </div>
  );
}