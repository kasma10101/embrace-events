import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";
import { Button, CircularProgress } from "@mui/material";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import "../style/contact.css";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    const name = form.current.elements.user_name.value;
    const email = form.current.elements.user_email.value;
    const message = form.current.elements.message.value;

    if (!name) {
      console.log("Please enter your name.");
      setError("Please enter your name.");
      setLoading(false);
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      console.log("Please enter a valid email address.");
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (!message) {
      console.log("Please enter your message.");
      setError("Please enter your message.");
      setLoading(false);
      return;
    }

    emailjs
      .sendForm(
        "service_5c5rm6r",
        "template_qdazn2l",
        form.current,
        "E3zxZERoaqvQhwHcP"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
          setLoading(false);
          setError("");
          form.current.elements.user_name.value = "";
          form.current.elements.user_email.value = "";
          form.current.elements.message.value = "";
        },
        (error) => {
          setLoading(false);
          console.log(error.text);
        }
      );
  };

  return (
    <section
      className="contact_container"
      style={{
        width: "100%",
        backgroundColor: "#f1f8ff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "2rem",
      }}
      >
      <StyledContactForm>
        <h2 style={{color: "#13a014", marginTop: "1rem", textAlign: "center"}}>Contact Us</h2>
        <form className="contact_form" ref={form} onSubmit={sendEmail}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "baseline",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <label>Name</label>
            <input type="text" name="user_name" placeholder="Enter your name" />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "baseline",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <label>Email</label>
            <input type="email" name="user_email" placeholder="Enter Email" />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "baseline",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <label>Message</label>
            <textarea name="message" placeholder="Type your message here" />
          </div>
          <div style={{ width: "90%" }}>
            {loading ? (
              <div style={{ marginTop: "20px", textAlign: "center" }}>
                <CircularProgress />
              </div>
            ) : (
              <input type="submit" value="Send" />
            )}
          </div>
          {error && (
            <p
              style={{
                fontSize: 20,
                color: "red",
                paddingLeft: "5px",
                fontFamily: "nyala",
              }}
            >
              {error}
            </p>
          )}
        </form>
      </StyledContactForm>
      <div className="contact_info">
        <h2 style={{color: "#13a014", textAlign: "center"}}>Contact Info</h2>
      <div className="phone" style={{justifyContent: "flex-start"}}>
          <span>
            <FaPhoneAlt />
          </span>
          <p>+251 987 298989</p>
        </div>
        <div className="location" style={{justifyContent: "flex-start"}}>
          <span>
            <FaMapMarkerAlt />
          </span>
          <p>Mekanisa, Abo Mazorya Addis Ababa, Ethiopia </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;

// Styles
const StyledContactForm = styled.div`
  width: 100%;

    input {
      width: 100%;
      height: 35px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 1px solid #13a014;
      }
    }

    textarea {
      max-width: 300px;
      min-width: 300px;
      max-height: 150px;
      min-height: 150px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 1px solid #13a014;
      }
    }

    label {
      margin-top: 1rem;
    }

    input[type="submit"] {
        cursor: pointer;
        color: #13a014;
        border: none;
        border: 1px solid #13a014;
        width: 50%;
        align-self: center;
        margin: 1rem auto 0;
        
      &:hover {
        background-color: #13a014;
        border: none;
        color: #fff;
        transition: 0.3s;
      }
    }
  }
`;
