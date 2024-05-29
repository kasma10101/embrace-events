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
        navigate("/profile")
      }
      else {
        navigate(paths[1])
      }

    }

  }, [loggedIn])

  return (
    <div className="whole-nav-bar">
          <div className="logo">
            <img src={embraceLogo} alt="embraceLogo" />
              <span>Events.</span>
          </div>
          <div className={isMenuOpen ? "nav_bar " : "hidden nav_bar"}>
            {loggedIn ? <>
              <Link className="each-nav-bar" style={{color: '#f1f8ff', textDecoration: 'none',  borderBottom : location.pathname === '/blogs' ? '1px solid #f1f8ff' : ''}} onClick={handleClick} to="/blogs">Blog</Link>
              <Link className="each-nav-bar" style={{color: '#f1f8ff', textDecoration: 'none',  borderBottom : location.pathname === '/tickets' ? '1px solid #f1f8ff' : ''}} onClick={handleClick} to="/tickets">Tickets</Link>
              <Link className="each-nav-bar" style={{color: '#f1f8ff', textDecoration: 'none',  borderBottom : location.pathname === '/transaction' ? '1px solid #f1f8ff' : ''}} onClick={handleClick} to="/transaction">Transactions</Link>
              <Link className="each-nav-bar" style={{color: '#f1f8ff', textDecoration: 'none',  borderBottom : location.pathname === '/profile' ? '1px solid #f1f8ff' : ''}} onClick={handleClick} to="/profile">Profile</Link>
              </>: 
              <Link className="each-nav-bar" to="/login">Login</Link>}
              </div>
            <div className="icon" onClick={handleClick}>
              {!isMenuOpen ? (
                <FaBars cursor={"pointer"} style={{color: '#f1f8ff'}}/>
              ) : (
                <FaTimes cursor={"pointer"} />
              )}
          </div>
        </div>
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