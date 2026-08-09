import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center">

        <div className="text-8xl mb-6">
          📕
        </div>

        <h1 className="text-6xl font-bold text-emerald-700">
          404
        </h1>

        <h2 className="text-2xl font-bold text-gray-800 mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-600 mt-3 max-w-md mx-auto">
          Maaf kijiye, jo page aap dhoondh rahe hain woh maujood nahi hai
          ya uska address change ho gaya hai.
        </p>

        <Link
          to="/"
          className="inline-block mt-7 bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          🏠 Back to Home
        </Link>

      </div>
    </div>
  );
}