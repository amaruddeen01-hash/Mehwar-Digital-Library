import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLogin(!!user);
    });

    return () => unsubscribe();
  }, [location]);

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
    <nav className="bg-emerald-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        <Link to="/" className="text-2xl font-bold">
          📚 Mehwar Digital Library
        </Link>

        <div className="flex items-center gap-6">

          <Link to="/">🏠 Home</Link>
          <Link to="/books">📚 Books</Link>
          <Link to="/favorites">❤️ Favorites</Link>
          <Link to="/authors">👤 Authors</Link>
          <Link to="/about">ℹ️ About</Link>
          <Link to="/contact">📞 Contact</Link>

          {isLogin ? (
            <>
              <Link to="/admin">🛠 Admin</Link>

              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-white text-emerald-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
            >
              Login
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
}