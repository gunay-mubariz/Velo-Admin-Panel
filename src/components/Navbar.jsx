import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import VeloLogo from './../assets/velo-logo.png';
import { MdCreateNewFolder } from "react-icons/md";


const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/" className="logo">
        <img src={VeloLogo} alt="velo-logo" />
      </Link>
      <Link to="/create" className="create-btn">
        <MdCreateNewFolder/>
      </Link>
    </div>
  );
};

export default Navbar;
