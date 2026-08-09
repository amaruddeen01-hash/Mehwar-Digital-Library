import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* About */}
          <div>
            <h2 className="text-2xl font-bold text-emerald-400">
              📚 Mehwar Digital Library
            </h2>

            <p className="mt-4 text-gray-400 leading-7">
              Mehwar Digital Library ek online digital library hai jahan
              Urdu, Arabic, Hindi aur English ki Islamic books ko online
              padha aur download kiya ja sakta hai.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-gray-400">

              <Link
                to="/"
                className="hover:text-emerald-400 transition"
              >
                🏠 Home
              </Link>

              <Link
                to="/books"
                className="hover:text-emerald-400 transition"
              >
                📚 Books
              </Link>

              <Link
                to="/authors"
                className="hover:text-emerald-400 transition"
              >
                👤 Authors
              </Link>

              <Link
                to="/favorites"
                className="hover:text-emerald-400 transition"
              >
                ❤️ Favorites
              </Link>

            </div>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              Information
            </h3>

            <div className="flex flex-col gap-3 text-gray-400">

              <Link
                to="/about"
                className="hover:text-emerald-400 transition"
              >
                ℹ️ About Us
              </Link>

              <Link
                to="/contact"
                className="hover:text-emerald-400 transition"
              >
                📞 Contact
              </Link>

              {/* Privacy Policy */}
              <Link
                to="/privacy"
                className="hover:text-emerald-400 transition"
              >
                🔒 Privacy Policy
              </Link>

              {/* Terms & Conditions */}
              <Link
                to="/terms"
                className="hover:text-emerald-400 transition"
              >
                📄 Terms & Conditions
              </Link>

            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-10 pt-6">

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Mehwar Digital Library.
              All rights reserved.
            </p>

            <p className="text-gray-500 text-sm">
              Made with ❤️ for Islamic Knowledge
            </p>

          </div>

        </div>

      </div>
    </footer>
  );
}