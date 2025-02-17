import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import removeCookie from "../auth/removeCookie";
import { logOut } from "../features/auth/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Nav = () => {
  const [user, setUser] = useState(null); 
  const reduxUser = useSelector((state) => state.auth.user); 
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setUser(reduxUser);
  }, [reduxUser]);

  const handleLogout = async (e) => {
    console.log('loging out')
    e.preventDefault();
    removeCookie("refresh_token");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/log-out`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(response)
      if (response.status === 201) {
        dispatch(logOut());
        navigate("/Login");
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-10 mb-6">
      <div className="container mx-auto flex justify-between items-center p-3">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          REVE
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center md:flex space-x-6">
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
          {user?.id ? (
            <Link
              to="/logout"
              onClick={(e) => handleLogout(e)}
              className="text-white bg-blue-500 hover:bg-blue-600 rounded-full px-4 py-2"
            >
              Logout
            </Link>
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
          {isMenuOpen ? (
            <i className="bi bi-x-lg"></i>
          ) : (
            <i className="bi bi-list"></i>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white shadow-md">
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
              {user?.id ? (
                <Link
                  to="/logout"
                  onClick={(e) => {
                    handleLogout(e);
                    setIsMenuOpen(false);
                  }}
                  className="block text-white bg-blue-500 hover:bg-blue-600 rounded-full px-4 py-2"
                >
                  Logout
                </Link>
              ) : (
                <Link
                  to="/signup"
                  className="block text-white bg-blue-500 hover:bg-blue-600 rounded-full px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};
