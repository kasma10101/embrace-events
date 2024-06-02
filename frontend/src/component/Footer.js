import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import embraceLogo from "../assets/logo/embraceLogo.png";
import "../style/footer.css";

export default function Footer() {
  return (
    <div className="bottom">
      <div className="footer">
        <div className="first">
          <img src={embraceLogo} alt="embrace logo" />
          <p>
            Join our newsletter to receive updates on upcoming events and
            releases.
          </p>
        </div>
        <div className="second">
          <div className="one">
            <h6>Column One</h6>
            <a href="">About Us</a>
            <a href="">Contact Us</a>
          </div>
          <div className="three">
            <h6>Follow us</h6>
            <a href="">
              <FaFacebookF
                style={{
                  color: "#12372a",
                  fontSize: "15px",
                  marginRight: "1rem",
                }}
              />
              Facebook
            </a>
            <a href="">
              <FaInstagram
                style={{
                  color: "#12372a",
                  fontSize: "15px",
                  marginRight: "1rem",
                }}
              />
              Instagram
            </a>
            <a href="">
              <FaTwitter
                style={{
                  color: "#12372a",
                  fontSize: "15px",
                  marginRight: "1rem",
                }}
                id="twitter_icon"
              />
              Twitter
            </a>
            <a href="">
              {" "}
              <FaLinkedinIn
                style={{
                  color: "#12372a",
                  fontSize: "15px",
                  marginRight: "1rem",
                }}
              />{" "}
              Linkedin
            </a>
            <a href="">
              <FaYoutube
                style={{
                  color: "#12372a",
                  fontSize: "15px",
                  marginRight: "1rem",
                }}
              />{" "}
              Youtube
            </a>
          </div>
        </div>
      </div>
      <hr className="footer__line" />
      <div className="bottom__two">
        <div className="right">
          <p>© 2024 Embrace Events. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}