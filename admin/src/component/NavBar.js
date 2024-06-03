import { useEffect, useState } from "react";
import embraceLogo from "../assets/logo/embraceLogo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import "../style/navbar.css";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

export default function Navbar({ loggedIn }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate()
  const showNavbar = () => {
    setIsMenuOpen(true)
  };
  const hideNavbar = () => {
    setIsMenuOpen(false)
  };
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
        navigate("/profile")
      }
      else {
        navigate(paths[1])
      }

    }

  }, [loggedIn])

  return (
    <header>
          <div className="logo">
            <img src={embraceLogo} alt="embraceLogo" />
              <span>Events.</span>
          </div>
            {loggedIn ? (
            <>
          <nav className={isMenuOpen ? "responsive_nav " : "nav_bar"}>
              {/* <Link className="each-nav-bar" onClick={handleClick} to="/blogs">Blog</Link>
              <Link className="each-nav-bar" onClick={handleClick} to="/tickets">Tickets</Link>
              <Link className="each-nav-bar" onClick={handleClick} to="/transaction">Transactions</Link>
              <Link className="each-nav-bar" onClick={handleClick} to="/profile">Profile</Link> */}
              <NavLink to="/blogs" activeClassName="active" onClick={hideNavbar}>Blog</NavLink>
              <NavLink to="/tickets" activeClassName="active" onClick={hideNavbar}>Tickets</NavLink>
              <NavLink to="/transaction" activeClassName="active" onClick={hideNavbar}>Transactions</NavLink>
              <NavLink to="/emails" activeClassName="active" onClick={hideNavbar}>Subscribers</NavLink>
              <NavLink to="/profile" activeClassName="active" onClick={hideNavbar}>Profile</NavLink>
              </nav>
              <div className="nav-btn">
                  {isMenuOpen ? (
                    <FaTimes className="nav_menubar" onClick={hideNavbar}/>
                  ) : (
                    <FaBars className="nav-close-btn" onClick={showNavbar}/>
                  )}
              </div>
                  </>
            ):(
              <p className="login_first">You Have To Login First</p>
            )}
      </header>
    // <>

    //   <div className={isMenuOpen ? "nav__link__two" : "nav__link__two close"}>
    //     {loggedIn ?
    //       <>
    //         <li>
    //           <Link to={loggedIn ? "/blogs" : "/"}>Blog</Link>
    //         </li>
    //         <li>
    //           <Link to="/tickets">Tickets</Link>
    //         </li>
    //         <li>
    //           <Link to="/transaction">Transactions</Link>
    //         </li>
    //         <li>
    //           <Link to={loggedIn ? "/profile" : "/"}>Profile</Link>
    //         </li>

    //       </>

    //       :
    //       <li>
    //         <Link to="/login">Login</Link>
    //       </li>

    //     }
    //   </div>
    //   <div
    //     className="toggle"
    //     onClick={handleClick}
    //     style={icon ? { width: "100%" } : {}}
    //   >
    //     <div className="icon">
    //       {!isMenuOpen ? (
    //         <FaBars cursor={"pointer"} />
    //       ) : (
    //         <FaTimes cursor={"pointer"} />
    //       )}
    //     </div>
    //     {/* <div className="text">{text ? "MENU" : "CLOSE"}</div> */}
    //   </div>
    // </>
  );
}