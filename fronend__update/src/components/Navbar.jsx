import { useState } from "react";
import embraceLogo from "../assets/logo/embraceLogo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

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
    <nav>
      <ul>
        <div className="logo">
          <img src={embraceLogo} alt="embraceLogo" />
          <li>
            <span>Events.</span>
          </li>
        </div>

        <div className={isMenuOpen ? "nav__link open" : "nav__link__two close"}>
          <li>
            <a href="">Home</a>
          </li>
          <li>
            <a href="">About</a>
          </li>
          <li>
            <a href="">Events</a>
          </li>
          <li>
            <a href="">Blog</a>
          </li>
          <li>
            <a href="">Contact</a>
          </li>

          <button>
            <a href="">Buy ticket</a>
          </button>
        </div>
        <div
          className="toggle"
          onClick={handleClick}
          style={icon ? { width: "100%" } : {}}
        >
          <div className="icon">{icon ? <FaBars /> : <FaTimes />}</div>
          <div className="text">{text ? "MENU" : "CLOSE"}</div>
        </div>
      </ul>
    </nav>
  );
}
