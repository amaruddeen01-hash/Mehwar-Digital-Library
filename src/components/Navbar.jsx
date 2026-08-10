import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLogin(!!user);
    });

    return () => unsubscribe();
  }, []);

  // Route change hone par mobile menu band
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logout Successful");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Logout Failed");
    }
  };

  return (
    <nav className="bg-emerald-700 text-white shadow-lg relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">

        {/* Main Navbar Row */}
        <div className="flex items-center justify-between gap-3">

          {/* Logo */}
          <Link
            to="/"
            className="text-lg sm:text-2xl font-bold whitespace-nowrap flex-shrink-0"
          >
            📚 Mehwar Digital Library
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-5 lg:gap-6">

            <Link
              to="/"
              className="hover:text-emerald-200 transition whitespace-nowrap"
            >
              🏠 Home
            </Link>

            <Link
              to="/books"
              className="hover:text-emerald-200 transition whitespace-nowrap"
            >
              📚 Books
            </Link>

            <Link
              to="/favorites"
              className="hover:text-emerald-200 transition whitespace-nowrap"
            >
              ❤️ Favorites
            </Link>

            <Link
              to="/authors"
              className="hover:text-emerald-200 transition whitespace-nowrap"
            >
              👤 Authors
            </Link>

            <Link
              to="/about"
              className="hover:text-emerald-200 transition whitespace-nowrap"
            >
              ℹ️ About
            </Link>

            <Link
              to="/contact"
              className="hover:text-emerald-200 transition whitespace-nowrap"
            >
              📞 Contact
            </Link>

            {isLogin ? (
              <>
                <Link
                  to="/admin"
                  className="hover:text-emerald-200 transition whitespace-nowrap"
                >
                  🛠 Admin
                </Link>

                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg whitespace-nowrap"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-white text-emerald-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 whitespace-nowrap"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex-shrink-0 text-3xl w-11 h-11 flex items-center justify-center rounded-lg hover:bg-emerald-800 transition"
            aria-label="Toggle Menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 border-t border-emerald-500 pt-4">

            <div className="flex flex-col gap-2">

              <Link
                to="/"
                className="px-4 py-3 rounded-lg hover:bg-emerald-800 transition"
              >
                🏠 Home
              </Link>

              <Link
                to="/books"
                className="px-4 py-3 rounded-lg hover:bg-emerald-800 transition"
              >
                📚 Books
              </Link>

              <Link
                to="/favorites"
                className="px-4 py-3 rounded-lg hover:bg-emerald-800 transition"
              >
                ❤️ Favorites
              </Link>

              <Link
                to="/authors"
                className="px-4 py-3 rounded-lg hover:bg-emerald-800 transition"
              >
                👤 Authors
              </Link>

              <Link
                to="/about"
                className="px-4 py-3 rounded-lg hover:bg-emerald-800 transition"
              >
                ℹ️ About
              </Link>

              <Link
                to="/contact"
                className="px-4 py-3 rounded-lg hover:bg-emerald-800 transition"
              >
                📞 Contact
              </Link>

              {isLogin ? (
                <>
                  <Link
                    to="/admin"
                    className="px-4 py-3 rounded-lg hover:bg-emerald-800 transition"
                  >
                    🛠 Admin
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="text-left px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-3 rounded-lg bg-white text-emerald-700 font-semibold hover:bg-gray-100"
                >
                  Login
                </Link>
              )}

            </div>
          </div>
        )}

      </div>
    </nav>
  );
}