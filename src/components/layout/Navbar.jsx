import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react"; // X for close button
import { Link } from "react-router-dom";
import { useSelector, useDispatch,shallowEqual } from "react-redux"
import { removeOwner } from "../../redux/AuthSlice";
import { useNavigate } from "react-router-dom";
import useAPI from "../../hooks/useAPI";
import NotificationBell from "./Notification";
const Navbar = () => {
    const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { email, name } = useSelector((state) => state?.auth?.owner || {},shallowEqual);
    console.log(name)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { callApi, loading, error } = useAPI();

    useEffect(() => {

        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    useEffect(() => {

        if (name && email) setIsLoggedIn(true);
        else setIsLoggedIn(false);
    }, [name, email])

    const logout = async () => {
        console.log("logged out");
        setIsLoggedIn(false);
        setMenuOpen(false);
        dispatch(removeOwner());
        navigate("/");

        // Call API for logout
        const response = await callApi({
            url: "api/owner/logout",
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });

        // console.log("Logout Response:", response);
    };


    return (
        <nav className="sticky top-0  z-50 flex items-center justify-between p-4 border-b-2 border-b-cyan-900 dark:border-b-cyan-50 bg-background-light dark:bg-background-dark shadow-md">
            {/* Logo */}
            <Link to="/" className="text-xl font-bold text-heading-light dark:text-heading-dark">
                ShopEase
            </Link>
            {isLoggedIn && <NotificationBell />}
            {/* Buttons */}
            <div className="hidden sml:flex items-center gap-4">
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
                        <Link
                            to="/dashboard"
                            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-md hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                        >
                            Dashboard
                        </Link>

                        <button
                            onClick={logout}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            to="/login"
                            className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                        >
                            Sign Up
                        </Link>
                    </>
                )}
            </div>

            {/* Hamburger Menu (Visible on small screens) */}
            <div className="sml:hidden">
                <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 dark:text-white">
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Dropdown Menu for small screens */}
            {menuOpen && (
                <div className="absolute top-14 right-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 flex flex-col gap-3 sml:hidden">
                    {/* Theme Toggle */}
                    <button
                        onClick={() => {
                            setDarkMode(!darkMode);
                            setMenuOpen(false); // Close menu after click
                        }}
                        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                        {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-900" />}
                    </button>

                    {/* Auth Buttons */}
                    {isLoggedIn ? (
                        <>
                            <Link
                                to="/dashboard"
                                className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-md hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                            >
                                Dashboard
                            </Link>

                            <button
                                onClick={
                                    logout
                                }
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                onClick={() => setMenuOpen(false)}
                                className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                onClick={() => setMenuOpen(false)}
                                className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
