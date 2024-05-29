import { useState } from "react";
import embraceLogo from "../assets/logo/embraceLogo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import "../style/navbar.css";
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router-dom'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [icon, setIcon] = useState(true);
  const [text, setText] = useState(true);
  const location = useLocation()
  const [path, setPath] = useState('')

  function handleClick() {
    setIcon((icon) => !icon);
    setText((text) => !text);
    setIsMenuOpen(!isMenuOpen);
  }
  
  return (
        <div className="whole-nav-bar">
          <div className="logo">
            <img src={embraceLogo} alt="embraceLogo" />
              <span>Events.</span>
          </div>
          <div className={isMenuOpen ? "nav_bar " : "hidden nav_bar"}>
              <Link className="each-nav" style={{color: '#f1f8ff', textDecoration: 'none', borderBottom : location.pathname === '/' ? '1px solid #f1f8ff' : ''}} onClick={handleClick} to="/">Home</Link>
              <Link className="each-nav" style={{color: '#f1f8ff', textDecoration: 'none',  borderBottom : location.pathname === '/blogs' ? '1px solid #f1f8ff' : ''}} onClick={handleClick} to="/blogs">Blog</Link>
              <Link className="each-nav" style={{color: '#f1f8ff', textDecoration: 'none',  borderBottom : location.pathname === '/mytickets' ? '1px solid #f1f8ff' : ''}} onClick={handleClick} to="/mytickets">My Tickets</Link>
              <Link className="each-nav" style={{color: '#f1f8ff', textDecoration: 'none',  borderBottom : location.pathname === '/about' ? '1px solid #f1f8ff' : ''}} onClick={handleClick} to="/about">About</Link>
              <Link className="each-nav" style={{color: '#f1f8ff', textDecoration: 'none',  borderBottom : location.pathname === '/contact' ? '1px solid #f1f8ff' : ''}} onClick={handleClick} to="/contact">Contact</Link>
          </div>
            <div className="icon" onClick={handleClick}>
              {!isMenuOpen ? (
                <FaBars cursor={"pointer"} style={{color: '#f1f8ff'}}/>
              ) : (
                <FaTimes cursor={"pointer"} />
              )}
          </div>
        </div>
  );
}