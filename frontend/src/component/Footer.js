import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import embraceLogo from "../assets/logo/embraceLogo.png";
import "../style/footer.css";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { CircularProgress, FormGroup, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/api/subscribe/addEmail`,
        { email }, // sending email as JSON
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setEmail("");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bottom">
      <div>
        <p className="join_par">
          Join our newsletter to receive updates on upcoming events and
          releases.
        </p>
        <Form onSubmit={handleSubscribe} className="newsletter_form">
          <FormGroup>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              style={{ width: 300, padding: "25px" }}
              value={email}
              required
            />
          </FormGroup>

          <div>
            {loading ? (
              <div style={{ marginTop: "20px", textAlign: "center" }}>
                <CircularProgress />
              </div>
            ) : (
              <button className="login-button" type="submit">
                Subscribe
              </button>
            )}
          </div>
        </Form>
      </div>
      <div className="footer">
        <div className="first">
          <img src={embraceLogo} alt="embrace logo" />
        </div>
        <div className="second">
          <div className="one">
            <h6>Quick Links</h6>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/blogs">Blogs</Link>
            <Link to="mytickets">My Tickets</Link>
          </div>
          <div className="three">
            <h6>Follow us</h6>
            <a href="https://www.facebook.com/profile.php?id=61558596520935&mibextid=rS40aB7S9Ucbxw6v">
              <FaFacebookF
                style={{
                  color: "#12372a",
                  fontSize: "15px",
                  marginRight: "1rem",
                }}
                className="social_icon"
              />
              Facebook
            </a>
            <a href="https://www.instagram.com/embracevents?igsh=OXZndmN5MTYwMWIx">
              <FaInstagram
                style={{
                  color: "#12372a",
                  fontSize: "15px",
                  marginRight: "1rem",
                }}
                className="social_icon"
              />
              Instagram
            </a>
            {/* <a href="">
              <FaTwitter
                style={{
                  color: "#12372a",
                  fontSize: "15px",
                  marginRight: "1rem",
                }}
                id="twitter_icon"
                className="social_icon"
              />
              Twitter
            </a> */}
            <a href="https://www.linkedin.com/company/embrace-events-organizer/">
              {" "}
              <FaLinkedinIn
                style={{
                  color: "#12372a",
                  fontSize: "15px",
                  marginRight: "1rem",
                }}
                className="social_icon"
              />{" "}
              Linkedin
            </a>
            {/* <a href="">
              <FaYoutube
                style={{
                  color: "#12372a",
                  fontSize: "15px",
                  marginRight: "1rem",
                }}
                className="social_icon"
              />{" "}
              Youtube
            </a> */}
          </div>
        </div>
      </div>
      <hr className="footer__line" />
      <div className="bottom__two">
          © 2024 Embrace Events. All rights reserved.
      </div>
      <div style={{textAlign:"center",opacity:0.5,wordSpacing:"1px"}}>
          <p>Developed By Kasma Software Solutions</p>
      </div>
    </div>
  );
}
