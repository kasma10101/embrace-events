import { useState } from "react";
import embraceLogo from "../assets/logo/embraceLogo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import "../style/navbar.css";

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

          <div className={isMenuOpen ? "none" : "nav__link__two close"}>
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
          </div>
          <div
            className="toggle"
            onClick={handleClick}
            style={icon ? { width: "100%" } : {}}
          >
            <div className="icon">
              {icon ? (
                <FaBars cursor={"pointer"} />
              ) : (
                <FaTimes cursor={"pointer"} />
              )}
            </div>
            <div className="text">{text ? "MENU" : "CLOSE"}</div>
          </div>
        </ul>
      </nav>

      <div className={isMenuOpen ? "nav__link open" : "none"}>
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
      </div>
    </>
  );
}
