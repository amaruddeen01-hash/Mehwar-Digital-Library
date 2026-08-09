import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  doc,
  getDoc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { db } from "../firebase";

import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function BookDetails() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.2);

  const [counted, setCounted] = useState(false);

  // Saved page load hone ke baad hi localStorage me save karega
  const pageLoadedRef = useRef(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        pageLoadedRef.current = false;

        const docRef = doc(db, "books", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = {
            id: docSnap.id,
            ...docSnap.data(),
          };

          // Pehle saved page read karo
          const savedPageRaw = localStorage.getItem(
            `reading-${docSnap.id}`
          );

          const savedPage = Number(savedPageRaw);

          // Valid saved page ho to wahi open karo
          if (savedPage > 0) {
            setPageNumber(savedPage);
          } else {
            setPageNumber(1);
          }

          setBook(data);

          // Ab saving allow karo
          pageLoadedRef.current = true;
        } else {
          setBook(null);
        }
      } catch (error) {
        console.error("Error loading book:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  // Current page ko localStorage me save karo
  useEffect(() => {
    if (
      book &&
      pageNumber > 0 &&
      pageLoadedRef.current
    ) {
      localStorage.setItem(
        `reading-${book.id}`,
        String(pageNumber)
      );
    }
  }, [pageNumber, book]);

  async function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);

    // Agar saved page PDF ke total pages se zyada ho gaya ho
    if (pageNumber > numPages) {
      setPageNumber(1);
    }

    if (!counted && book) {
      try {
        await updateDoc(doc(db, "books", book.id), {
          downloads: increment(1),
        });

        setBook((prev) => ({
          ...prev,
          downloads: (prev.downloads || 0) + 1,
        }));

        setCounted(true);
      } catch (error) {
        console.error("Download counter error:", error);
      }
    }
  }

  if (loading) {
    return (
      <div className="text-center p-20">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center p-20">
        <h1 className="text-3xl">
          📕 Book Not Found
        </h1>

        <Link
          to="/books"
          className="inline-block mt-5 bg-emerald-700 text-white px-5 py-2 rounded-lg"
        >
          ← Back to Books
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">

      <Link
        to="/books"
        className="text-emerald-700 font-bold"
      >
        ← Back to Books
      </Link>

      <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">

        <div className="flex flex-wrap gap-10">

          {/* Cover */}
          <div className="w-64 h-96 rounded-xl overflow-hidden bg-gray-100">

            {book.cover ? (
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-8xl">
                📘
              </div>
            )}

          </div>

          {/* Book Information */}
          <div className="flex-1">

            <h1 className="text-3xl font-bold text-emerald-700">
              {book.title}
            </h1>

            <div className="mt-5 space-y-2">
              <p>
                <b>👤 Author:</b> {book.author}
              </p>

              <p>
                <b>📂 Category:</b> {book.category}
              </p>

              <p>
                <b>🌐 Language:</b> {book.language}
              </p>

              <p>
                <b>🏢 Publisher:</b> {book.publisher}
              </p>

              <p>
                <b>📅 Year:</b> {book.year}
              </p>

              <p>
                <b>📄 Pages:</b> {book.pages}
              </p>

              <p>
                <b>⭐ Rating:</b> {book.rating || 0}
              </p>

              <p>
                <b>⬇ Downloads:</b> {book.downloads || 0}
              </p>
            </div>

            {/* Reading Progress */}
            {book.pdf && (
              <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <p className="font-semibold text-emerald-700">
                  📖 Reading Progress
                </p>

                <p className="text-gray-700 mt-2">
                  Last Read Page:{" "}
                  <b>{pageNumber}</b>
                </p>
              </div>
            )}

            <hr className="my-6" />

            <h2 className="text-xl font-bold">
              Description
            </h2>

            <p className="mt-3 text-gray-600">
              {book.description}
            </p>

            {/* PDF Reader */}
            {book.pdf && (
              <>
                <hr className="my-8" />

                <div className="flex flex-wrap gap-3 mb-6">

                  {/* Zoom Out */}
                  <button
                    onClick={() =>
                      setScale((prev) =>
                        Math.max(0.8, prev - 0.2)
                      )
                    }
                    className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg"
                  >
                    ➖ Zoom Out
                  </button>

                  {/* Zoom In */}
                  <button
                    onClick={() =>
                      setScale((prev) => prev + 0.2)
                    }
                    className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-lg"
                  >
                    ➕ Zoom In
                  </button>

                  {/* Previous */}
                  <button
                    disabled={pageNumber <= 1}
                    onClick={() =>
                      setPageNumber((prev) =>
                        Math.max(1, prev - 1)
                      )
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                  >
                    ⬅ Previous
                  </button>

                  {/* Next */}
                  <button
                    disabled={
                      !numPages ||
                      pageNumber >= numPages
                    }
                    onClick={() =>
                      setPageNumber((prev) =>
                        Math.min(numPages, prev + 1)
                      )
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                  >
                    Next ➡
                  </button>

                  {/* Download */}
                  <a
                    href={book.pdf}
                    target="_blank"
                    rel="noreferrer"
                    onClick={async () => {
                      try {
                        await updateDoc(
                          doc(db, "books", book.id),
                          {
                            downloads: increment(1),
                          }
                        );

                        setBook((prev) => ({
                          ...prev,
                          downloads:
                            (prev.downloads || 0) + 1,
                        }));
                      } catch (error) {
                        console.error(
                          "Download counter error:",
                          error
                        );
                      }
                    }}
                    className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg"
                  >
                    📥 Download PDF
                  </a>

                </div>

                <p className="mb-4 font-semibold text-gray-700">
                  📄 Page {pageNumber} of{" "}
                  {numPages || "..."}
                </p>

                <div className="border rounded-xl overflow-auto p-4 bg-gray-100 flex justify-center">

                  <Document
                    file={book.pdf}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={
                      <p>Loading PDF...</p>
                    }
                    error={
                      <p>
                        ❌ Unable to load PDF.
                      </p>
                    }
                  >
                    <Page
                      pageNumber={pageNumber}
                      scale={scale}
                    />
                  </Document>

                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}