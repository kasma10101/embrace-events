import { useEffect, useState } from "react";
import embraceLogo from "../assets/logo/embraceLogo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import "../style/navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar({ loggedIn }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [icon, setIcon] = useState(true);
  const [text, setText] = useState(true);
  const navigate = useNavigate()

  function handleClick() {
    setIcon((icon) => !icon);
    setText((text) => !text);
    setIsMenuOpen(!isMenuOpen);
  }

  const location = useLocation()

  useEffect(() => {
    const paths = location.pathname.split("/")
    if (!loggedIn) {
      if (paths.length > 1 && (paths[1] !== 'signup' && paths[1] !== 'login')) {
        navigate("/login")
      }

    }
    else {
      if (paths.length > 1 && (paths[1] === 'login' || paths[1] === 'signup')) {
        console.log(paths);
        navigate("/profile")
      }
      else {
        console.log(paths);
        navigate(paths[1])
      }

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

          <div className={isMenuOpen ? "nav__link__two" : "nav__link__two close"}>
            {loggedIn ?
              <>
                <li>
                  <Link to={loggedIn ? "/blogs" : "/"}>Blog</Link>
                </li>
                <li>
                  <Link to="/tickets">Tickets</Link>
                </li>
                <li>
                  <Link to="/transaction">Transactions</Link>
                </li>
                <li>
                  <Link to={loggedIn ? "/profile" : "/"}>Profile</Link>
                </li>

              </>

              :
              <li>
                <Link to="/login">Login</Link>
              </li>

            }
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
        {loggedIn ?
          <>
            <li>
              <Link onClick={() => setIsMenuOpen(false)} to={loggedIn ? "/blogs" : "/"}>Blog</Link>
            </li>
            <li>
              <Link onClick={() => setIsMenuOpen(false)} to="/tickets">Tickets</Link>
            </li>
            <li>
              <Link to="/transaction">Transaction</Link>
            </li>
            <li>
              <Link onClick={() => setIsMenuOpen(false)} to={loggedIn ? "/profile" : "/"}>Profile</Link>
            </li>

          </>

          :
          <li>
            <Link to="/login">Login</Link>
          </li>

        }
      </div>
    </>
  );
}