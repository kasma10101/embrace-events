import { useEffect, useState } from "react";
import embraceLogo from "../assets/logo/embraceLogo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import "../style/navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar({loggedIn}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [icon, setIcon] = useState(true);
  const [text, setText] = useState(true);
  const navigate = useNavigate()

  function handleClick() {
    setIcon((icon) => !icon);
    setText((text) => !text);
    setIsMenuOpen(!isMenuOpen);
  }

  useEffect(()=>{
    if (!loggedIn) {
      navigate('/')
    }
  }, [loggedIn])
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
              <Link to={loggedIn ? "/blogs" : "/"}>Blog</Link>
            </li>
            <li>
              <Link to="">Tickets</Link>
            </li>
            <li>
              <Link to={loggedIn ? "/profile" : "/"}>Profile</Link>
            </li>
            <li>
              <Link to="/">Login</Link>
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
            {/* <div className="text">{text ? "MENU" : "CLOSE"}</div> */}
          </div>
        </ul>
      </nav>

      <div className={isMenuOpen ? "nav__link open" : "none"}>
        <li>
          <Link onClick={()=>setIsMenuOpen(false)} to="/">Login</Link>
        </li>
        <li>
          <Link onClick={()=>setIsMenuOpen(false)} to={loggedIn ? "/blogs" : "/"}>Blog</Link>
        </li>
        <li>
          <Link onClick={()=>setIsMenuOpen(false)} to={loggedIn ? "/profile" : "/"}>Profile</Link>
        </li>
      </div>
    </>
  );
}