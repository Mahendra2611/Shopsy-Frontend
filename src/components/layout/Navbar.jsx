import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom"; 

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="flex items-center justify-between p-4 bg-background-light dark:bg-background-dark shadow-md">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-heading-light dark:text-heading-dark">
        ShopEase
      </Link>

      {/* Buttons */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-900" />}
        </button>

        {/* Auth Buttons */}
        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className="text-paragraph-light dark:text-paragraph-dark">
              Dashboard
            </Link>
            <button
              onClick={() => setIsLoggedIn(false)} // Replace with logout logic
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-paragraph-light dark:text-paragraph-dark">
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
