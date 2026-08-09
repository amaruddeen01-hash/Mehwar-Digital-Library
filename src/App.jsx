import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Books from "./pages/Books";
import Favorites from "./pages/Favorites";
import Authors from "./pages/Authors";
import About from "./pages/About";
import Contact from "./pages/Contact";
import BookDetails from "./pages/BookDetails";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import BulkUpload from "./pages/BulkUpload";

import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Books */}
        <Route
          path="/books"
          element={<Books />}
        />

        {/* Favorites */}
        <Route
          path="/favorites"
          element={<Favorites />}
        />

        {/* Book Details */}
        <Route
          path="/book/:id"
          element={<BookDetails />}
        />

        {/* Authors */}
        <Route
          path="/authors"
          element={<Authors />}
        />

        {/* About */}
        <Route
          path="/about"
          element={<About />}
        />

        {/* Contact */}
        <Route
          path="/contact"
          element={<Contact />}
        />

        {/* Privacy Policy */}
        <Route
          path="/privacy"
          element={<Privacy />}
        />

        {/* Terms & Conditions */}
        <Route
          path="/terms"
          element={<Terms />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        {/* Add Book */}
        <Route
          path="/admin/add-book"
          element={
            <ProtectedRoute>
              <AddBook />
            </ProtectedRoute>
          }
        />

        {/* Bulk Upload */}
        <Route
          path="/admin/bulk-upload"
          element={
            <ProtectedRoute>
              <BulkUpload />
            </ProtectedRoute>
          }
        />

        {/* Edit Book */}
        <Route
          path="/admin/edit-book/:id"
          element={
            <ProtectedRoute>
              <EditBook />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

      <Footer />
    </>
  );
}