import { useState } from "react";
import { useRef } from "react";
import embraceLogo from "../assets/logo/embraceLogo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import "../style/navbar.css";
import { Link, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [icon, setIcon] = useState(true);
  const [text, setText] = useState(true);
  const location = useLocation();
  const [path, setPath] = useState("");

  function handleClick() {
    setIcon((icon) => !icon);
    setText((text) => !text);
    setIsMenuOpen(!isMenuOpen);
  }
  const navRef = useRef();

  const showNavbar = () => {
    setIsMenuOpen(true)
  };
  const hideNavbar = () => {
    setIsMenuOpen(false)
  };
  return (
    <header>
      <div className="logo">
        <img src={embraceLogo} alt="embraceLogo" />
        <span>Events.</span>
      </div>
      <nav className={isMenuOpen? "responsive_nav" : "nav_bar"}>
        <NavLink to="/" activeClassName="active" onClick={hideNavbar}>Home</NavLink>
        <NavLink to="/about" activeClassName="active" onClick={hideNavbar}>About Us</NavLink>
        <NavLink to="/blogs" activeClassName="active" onClick={hideNavbar}>Blog</NavLink>
        {/* <NavLink to="/contact" activeClassName="active" onClick={hideNavbar}>Contact Us</NavLink> */}
        <NavLink to="/mytickets" activeClassName="active" onClick={hideNavbar}>My Tickets</NavLink>
      </nav>
        <div className="nav-btn">
          {isMenuOpen ? (
            <FaTimes className="nav_menubar" onClick={hideNavbar}/>
          ) : (
            <FaBars className="nav-close-btn" onClick={showNavbar}/>
          )}
        </div>
    </header>
  );
}