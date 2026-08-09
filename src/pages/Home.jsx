import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../firebase";

import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import "./Home.css";

export default function Home() {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "books"));

        const firestoreBooks = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBooks(firestoreBooks);
      } catch (error) {
        console.error("Error loading books:", error);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    const text = `
      ${book.title || ""}
      ${book.author || ""}
      ${book.category || ""}
      ${book.language || ""}
      ${book.publisher || ""}
    `
      .toLowerCase()
      .trim();

    return text.includes(search.toLowerCase().trim());
  });

  const featuredBooks = filteredBooks.filter(
    (book) => book.featured === true
  );

  const latestBooks = filteredBooks
    .sort((a, b) => {
      const aTime = a.createdAt?.seconds || 0;
      const bTime = b.createdAt?.seconds || 0;
      return bTime - aTime;
    })
    .slice(0, 6);

  const categories = [
    ...new Set(
      books
        .map((book) => book.category)
        .filter(Boolean)
        .map((cat) => cat.trim())
    ),
  ].sort((a, b) => a.localeCompare(b));

  const totalAuthors = new Set(
    books
      .map((book) => book.author)
      .filter(Boolean)
      .map((author) => author.trim())
  ).size;

  return (
    <div className="home">
      <header className="hero">
        <h3>بسم الله الرحمن الرحيم</h3>

        <h1>📚 Mehwar Digital Library</h1>

        <p>
          Explore the treasures of authentic Islamic knowledge including
          Qur'an, Hadith, Tafsir, Fiqh, Aqeedah, Arabic and Islamic History.
        </p>
      </header>

      <div className="container">

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <div className="stats">

          <div className="stat-card">
            <h2>{books.length}</h2>
            <p>Total Books</p>
          </div>

          <div className="stat-card">
            <h2>{totalAuthors}</h2>
            <p>Authors</p>
          </div>

          <div className="stat-card">
            <h2>{categories.length}</h2>
            <p>Categories</p>
          </div>

          <div className="stat-card">
            <h2>{filteredBooks.length}</h2>
            <p>Search Results</p>
          </div>

        </div>

        <h2>📂 Categories</h2>

        <div className="categories">
          {categories.map((cat) => (
            <div
              key={cat}
              className="category-card"
            >
              {cat}
            </div>
          ))}
        </div>

        {featuredBooks.length > 0 && (
          <>
            <h2 style={{ marginTop: "60px" }}>
              ⭐ Featured Books
            </h2>

            <div className="book-grid">
              {featuredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                />
              ))}
            </div>
          </>
        )}

        <h2 style={{ marginTop: "60px" }}>
          🆕 Latest Books
        </h2>

        <div className="book-grid">
          {latestBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
            />
          ))}
        </div>

        {filteredBooks.length > 6 && (
          <div
            style={{
              textAlign: "center",
              marginTop: "25px",
            }}
          >
            <Link
              to="/books"
              style={{
                background: "#047857",
                color: "#fff",
                padding: "12px 25px",
                borderRadius: "10px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              View All Books →
            </Link>
          </div>
        )}

        {filteredBooks.length === 0 && (
          <p
            style={{
              textAlign: "center",
              marginTop: "30px",
            }}
          >
            📕 No books found.
          </p>
        )}

      </div>

      <footer className="footer">

        <h2>📚 Mehwar Digital Library</h2>

        <p>
          A Digital Library for Authentic Islamic Knowledge
        </p>

        <p>
          © 2026 Mehwar Digital Library. All Rights Reserved.
        </p>

      </footer>
    </div>
  );
}