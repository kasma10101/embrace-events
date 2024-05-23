import {
  Alert,
  CircularProgress,
  FormGroup,
  Link,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Button, Form, Nav } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setError("");

    if (!email || !password || !username) {
      setError("Fill all fields");
      return;
    }
    setLoading(true);
    let data = {
      username,
      password,
      email,
    };
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/api/admin/signup`,
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
      if (user.msg) {
        setLoading(false);
        window.location.href = "/login";
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
    <div style={{ paddingTop: "15%" }}>
      <div className="login-container">
        <div className="user-icon" style={{ marginBottom: "400px" }}>
          <FaUser style={{ fontSize: 80, color: "#fff" }} />
        </div>
        <div>
          <Form onSubmit={handleSubmit}>
            <FormGroup style={{ marginTop: 20 }}>
              <TextField
                placeholder="Enter username"
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                style={{ width: 300 }}
              />
            </FormGroup>
            <FormGroup style={{ marginTop: 15 }}>
              <TextField
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                style={{ width: 300 }}
              />
            </FormGroup>
            <FormGroup style={{ marginTop: 15 }}>
              <TextField
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                style={{ width: 300 }}
              />
            </FormGroup>

            {error && (
              <div style={{ margin: "8px 0 8px" }}>
                <Alert severity="error">{error}</Alert>
              </div>
            )}

            <div>
              {loading ? (
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                  <CircularProgress />
                </div>
              ) : (
                <Button
                  className="login-button"
                  type="submit"
                  variant="outline-dark"
                >
                  Signup
                </Button>
              )}
            </div>
          </Form>
          <div style={{ marginTop: "15px" }}>
            <Link style={{ textDecoration: "none" }} href="/login">
              Have an Account ?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
