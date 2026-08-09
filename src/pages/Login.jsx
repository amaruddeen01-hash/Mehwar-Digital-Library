import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      alert("✅ Login Successful");

      navigate("/admin");
    } catch (error) {
      console.error(error);

      switch (error.code) {
        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
          alert("Wrong Email or Password");
          break;

        case "auth/invalid-email":
          alert("Invalid Email Address");
          break;

        default:
          alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 shadow-lg rounded-xl">

      <h1 className="text-3xl font-bold text-emerald-700 text-center">
        🔐 Login Page
      </h1>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded-lg mt-6"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded-lg mt-4"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-700 text-white p-3 rounded-lg mt-5 hover:bg-emerald-800 disabled:bg-gray-400"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

    </div>
  );
}