import React from 'react';
import { Nav } from './Components/Nav';
import { Footer } from './Components/Footer';
import { Outlet } from 'react-router-dom';  // Import Outlet for nested routes

export const Layout = () => {
  return (
    <>
      <Nav />
      <Outlet />  {/* This renders the component based on the active route */}
      <Footer />
    </>
  );
};
