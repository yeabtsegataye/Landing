import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../features/auth/authSlice";
import { useLogoutMutation } from "../features/auth/authApiSlice";
import { useToast } from "@chakra-ui/react";

export const Nav = () => {
  const [user, setUser] = useState(null);
  const reduxUser = useSelector((state) => state.auth.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const toast = useToast();

  useEffect(() => {
    setUser(reduxUser);
  }, [reduxUser]);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await logout();
      dispatch(logOut());
      navigate("/Login");
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        title: "Error loging out",
        description: error.data?.message || "An unexpected error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          REVE
        </Link>
        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 items-center">
          <a href="#hero" className="text-gray-600 hover:text-blue-500">
            Home
          </a>
          <a href="#services" className="text-gray-600 hover:text-blue-500">
            Services
          </a>
          <a href="#about" className="text-gray-600 hover:text-blue-500">
            About
          </a>
          <a href="#portfolio" className="text-gray-600 hover:text-blue-500">
            Portfolio
          </a>
          <a href="#pricing" className="text-gray-600 hover:text-blue-500">
            Pricing
          </a>
          <a href="#contact" className="text-gray-600 hover:text-blue-500">
            Contact
          </a>
          <a href="https://hotel-main-dashboard.onrender.com" className="text-gray-600 hover:text-blue-500">
            Dashboard
          </a>
          {user?.id ? (
            <button
              onClick={handleLogout}
              className="text-white bg-blue-500 hover:bg-blue-600 rounded-full px-4 py-2"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/signup"
              className="text-white bg-blue-500 hover:bg-blue-600 rounded-full px-4 py-2"
            >
              Get Started
            </Link>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-2xl text-gray-800 focus:outline-none"
        >
          {isMenuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <nav
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden bg-white shadow-md`}
      >
        <ul className="space-y-4 p-4">
          <li>
            <a
              href="#hero"
              className="block text-gray-600 hover:text-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#services"
              className="block text-gray-600 hover:text-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="block text-gray-600 hover:text-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#portfolio"
              className="block text-gray-600 hover:text-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Portfolio
            </a>
          </li>
          <li>
            <a
              href="#pricing"
              className="block text-gray-600 hover:text-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="block text-gray-600 hover:text-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
          </li>
          <li>
            <a
              href="https://hotel-main-dashboard.onrender.com"
              className="block text-gray-600 hover:text-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </a>
          </li>
          <li>
            {user?.id ? (
              <button
                onClick={(e) => {
                  handleLogout(e);
                  setIsMenuOpen(false);
                }}
                className="block w-full text-center text-white bg-blue-500 hover:bg-blue-600 rounded-full px-4 py-2"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/signup"
                className="block text-center text-white bg-blue-500 hover:bg-blue-600 rounded-full px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};
