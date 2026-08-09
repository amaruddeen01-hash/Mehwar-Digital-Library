import { useNavigate } from "react-router-dom";

export default function Logout() {

  const navigate = useNavigate();


  const handleLogout = () => {

    localStorage.removeItem("adminLogin");

    window.dispatchEvent(new Event("storage"));

    alert("Logout Successful");

    navigate("/login");

  };


  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded-lg"
    >
      Logout
    </button>
  );
}