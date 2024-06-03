import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "../style/login.css";
import { Button, Form, Nav } from "react-bootstrap";
import {
  Alert,
  CircularProgress,
  FormGroup,
  Link,
  TextField,
} from "@mui/material";
import { FaUser } from "react-icons/fa";
import '../style/login.css'

export default function Login({ isSignUpAllowed }) {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Fill all fields");
      return;
    }
    setLoading(true);
    let data = {
      password,
      email,
    };
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/api/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
          }),
        }
      );
      const user = await response.json();
      if (user.token) {
        setLoading(false);
        const { token } = user;
        document.cookie = `token=${token}; path=/;`;
        window.location.href = "/profile";
        setError("");
      } else {
        setLoading(false);
        setError(user.error);
      }
    } catch (error) {
      setError("Check your internate connection then try again");
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: "9%" }}>
      <div className="login-container">
        <div className="user-icon">
          <FaUser style={{ fontSize: 80, color: "#fff" }} />
        </div>
        <div style={{ marginTop: "10%" }}>
          <Form onSubmit={handleSubmit}>
            <FormGroup style={{ marginTop: 30 }}>
              <TextField
                label="Email"
                onChange={(e) => setemail(e.target.value)}
                type="text"
                style={{ width: 300 }}
              />
            </FormGroup>
            <FormGroup style={{ marginTop: 15 }}>
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: 300 }}
              />
              
            </FormGroup>
            {error && (
              <div style={{ margin: "8px 0 8px", width: 300 }}>
                <Alert severity="error">{error}</Alert>
              </div>
            )}

            <div>
              {loading ? (
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                  <CircularProgress />
                </div>
              ) : (
                <button
                  className="login-button"
                  type="submit"
                >
                  Login
                </button>
              )}
            </div>
          </Form>

          {isSignUpAllowed && (
            <div style={{ marginTop: "15px" }}>
              <Link style={{ textDecoration: "none" }} href="/signup">
                Creat Account
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
