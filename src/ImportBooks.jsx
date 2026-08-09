import { useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import books from "./data/books.js";

export default function ImportBooks() {
  useEffect(() => {
    console.log("📚 Total books:", books.length);
    console.log("📖 Book names:", books.map((book) => book.title));

    const importBooks = async () => {
      for (const book of books) {
        try {
          console.log("⏳ Importing:", book.title);
          console.log("🔥 Sending to Firebase:", book.title);

          const docRef = await addDoc(collection(db, "books"), {
            ...book,
            importedAt: new Date(),
          });

          console.log("🔥 Saved ID:", docRef.id);
          console.log("✅ Imported:", book.title);
        } catch (error) {
          console.error("❌ Failed:", book.title);
          console.error("Error Code:", error.code);
          console.error("Error Message:", error.message);
        }
      }

      alert("✅ Import process completed!");
    };

    importBooks();
  }, []);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>📚 Importing Books...</h1>
      <p>Please wait...</p>
    </div>
  );
}