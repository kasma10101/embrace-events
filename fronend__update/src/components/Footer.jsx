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
          <div className="subscribe">
            <input
              type="text"
              name=""
              id=""
              style={{ textAlign: "left" }}
              placeholder="Enter email here"
            />
            <button className="subscribe__btn">
              <a href="">Subscribe</a>
            </button>
          </div>
          <p>
            By subscribing, you agree to our Privacy Policy and consent to
            receive updates from our company
          </p>
        </div>
        <div className="second">
          <div className="one">
            <h6>Column One</h6>
            <a href="">About Us</a>
            <a href="">Contact Us</a>
            <a href="">FAQ's</a>
            <a href="">Support</a>
            <a href="">Blogs</a>
          </div>
          <div className="two">
            <h6>Column Two</h6>
            <a href="">Terms</a>
            <a href="">Privacy</a>
            <a href="">Security</a>
            <a href="">Careers</a>
            <a href="">Press</a>
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
        <div className="left">
          <p>© 2024 Embrace Events. All rights reserved.</p>
        </div>
        <div className="right">
          <a href="">Privacy Policy</a>
          <a href="">Terms Service</a>
          <a href="">Cookie Settings</a>
        </div>
      </div>
    </div>
  );
}
