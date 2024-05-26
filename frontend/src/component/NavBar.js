import { useState } from "react";
import embraceLogo from "../assets/logo/embraceLogo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import "../style/navbar.css";
import {Link} from 'react-router-dom'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [icon, setIcon] = useState(true);
  const [text, setText] = useState(true);

  function handleClick() {
    setIcon((icon) => !icon);
    setText((text) => !text);
    setIsMenuOpen(!isMenuOpen);
  }
  return (
    <>
      <nav>
        <ul>
          <div className="logo">
            <img src={embraceLogo} alt="embraceLogo" />
            <li>
              <span>Events.</span>
            </li>
          </div>

          <div className={isMenuOpen ? "nav__link__two " : "nav__link__two close"}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/blogs">Blog</Link>
            </li>
         
            <li>
              <Link to="/mytickets">My Tickets</Link>
            </li>
          
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </div>
          <div
            className="toggle"
            onClick={handleClick}
            style={icon ? { width: "100%" } : {}}
          >
            <div className="icon">
              {!isMenuOpen ? (
                <FaBars cursor={"pointer"} />
              ) : (
                <FaTimes cursor={"pointer"} />
              )}
            </div>
            <div className="text">{!isMenuOpen ? "MENU" : "CLOSE"}</div>
          </div>
        </ul>
      </nav>

      <div className={isMenuOpen ? "nav__link open" : "none"}>
      <li>
              <Link onClick={()=>setIsMenuOpen(false)} to="/">Home</Link>
            </li>
            <li>
              <Link onClick={()=>setIsMenuOpen(false)} to="/blogs">Blog</Link>
            </li>
            <li>
              <Link onClick={()=>setIsMenuOpen(false)} to="/about">About</Link>
            </li>
            <li>
              <Link to="/about">Contact</Link>
            </li>
      </div>
    </>
  );
}