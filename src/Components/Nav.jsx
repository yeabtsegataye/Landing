import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import removeCookie from "../auth/removeCookie";
import { logOut } from "../features/auth/authSlice";
import axios from "axios";

export const Nav = () => {
  const [user, setUser] = useState(null); // Use useState to manage user state
  const reduxUser = useSelector((state) => state.auth.user); // Get user from Redux store
  const dispatch = useDispatch()
  useEffect(() => {
    // Update local user state when Redux user state changes
    setUser(reduxUser);
  }, [reduxUser]); // Re-run effect when reduxUser changes

 const handleLogout = async (e) => {
    e.preventDefault();
    removeCookie("refresh_token");

    try {
      // Make the request to the logout endpoint
      const response = await axios.post(
        "http://localhost:8000/auth/log-out",
        {},
        {
          withCredentials: true, // Include cookies in the request
        }
      );

      if (response.status === 201) {
        // Dispatch the logOut action to clear the Redux state
        dispatch(logOut());
        // Notif_Toast(
        //   toast,
        //   "Log out successful",
        //   "You have successfully logged out",
        //   "success"
        // );
        // Navigate to the login page
        navigate("/Login");
      } else {
        console.error("Failed to log out");
        // Handle the error as needed
      }
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle the error as needed
    }
  };
  return (
    <header id="header" className="header d-flex align-items-center sticky-top">
      <div className="container-fluid container-xl position-relative d-flex align-items-center">
        <a href="index.html" className="logo d-flex align-items-center me-auto">
          <h1 className="sitename">REVE</h1>
        </a>
        <nav id="navmenu" className="navmenu">
          <ul>
            <li>
              <a href="#hero" className="active">
                Home
              </a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#portfolio">Portfolio</a>
            </li>
            <li>
              <a href="#pricing">Pricing</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
          {/* Mobile Navigation Toggle */}
          <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>

        {user?.id ? ( // Check if user exists and has an ID
          <>
            
            <Link to="/logout" className="btn-getstarted" onClick={(e) => handleLogout(e)}>
              Logout
            </Link>
            {/* <p>{user?.email}</p> Display user's email */}
          </>
        ) : (
          // If no user, show "Get Started" button
          <Link to="/signup" className="btn-getstarted">
            Get Started
          </Link>
        )}
      </div>
    </header>
  );
};