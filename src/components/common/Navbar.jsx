import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { Button } from "./Button";

export default function Navbar() {
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-green-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold hover:text-green-300 transition-colors"
        >
          SmartServe
        </Link>
        <div className="space-x-4 flex items-center">
          {user ? (
            <>
              <span className="text-white font-medium">{user.name}</span>
              <Button
                variant="accent"
                onClick={logout}
                className="hover:bg-red-500 text-white px-4 py-2 rounded-md transition duration-200"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button
                variant="secondary"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400 transition duration-200"
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
