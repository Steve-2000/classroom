import React from "react";
import { useLocation } from "react-router-dom";
import Navbar2 from "./Navbar2";
import NavBar from './NavBar'

const NavbarWrapper = () => {
    const location = useLocation();
  
    if (location.pathname === '/login' || location.pathname === '/create-account '|| location.pathname === '/') {
      return <NavBar />;
    }
    return <Navbar2 />;
  };
  
export default NavbarWrapper;