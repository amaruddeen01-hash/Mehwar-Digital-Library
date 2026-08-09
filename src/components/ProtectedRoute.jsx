import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Firebase authentication check hone tak
  if (user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-3">⏳</div>
          <p className="text-lg font-semibold text-gray-600">
            Checking login...
          </p>
        </div>
      </div>
    );
  }

  // Login nahi hai
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Login hai
  return children;
}