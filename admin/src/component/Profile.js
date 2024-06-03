import { Alert, CircularProgress, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Button, Form, FormGroup } from "react-bootstrap"
import { FaPowerOff, FaSignOutAlt } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import '../style/profile.css'

export default function Profile({adminData,token}) {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    useEffect(()=>{
        setUsername(adminData.username||"")
        setEmail(adminData.email||"")
        setPassword(adminData.password || "")
    },[adminData])

    const handleSubmit = async (e) => {
        e.preventDefault();
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

        const response = await fetch(
            `${process.env.REACT_APP_BACKEND_API}/api/admin/update`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                ...data,
              }),
            }
          );
          const user = await response.json();

          if(user.msg){
              setLoading(false);
              setError("");
              window.location.href='/profile'
          }
          else{
            setLoading(false);
            setError(user.error);
          }
    }


    const logout = () => {
        document.cookie = `token=; ${new Date()}; path=/;`;
        window.location.href='/login'
    }

    return (
        <>
            <div style={{ paddingTop: '3%', display: 'flex', justifyContent: 'center', alignItems:  'center', height: '85vh' }}>
                <div className="login-container">
                    <Typography variant="h4" sx={{paddingTop:"25px", color: "#13A014"}}>Admin Profile</Typography>
                    <div style={{ marginTop: '2%' }}>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup style={{ marginTop: 30 }}>
                                <TextField
                                    onChange={(e) => setUsername(e.target.value)}
                                    type="text"
                                    style={{ width: 300 }}
                                    value={username}
                                    placeholder="Username"
                                    required
                                />
                            </FormGroup>
                            <FormGroup style={{ marginTop: 20 }}>
                                <TextField
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="text"
                                    style={{ width: 300 }}
                                    value={email}
                                    placeholder="Email"
                                    required
                                />
                            </FormGroup>
                            <FormGroup style={{ marginTop: 20 }}>
                                <TextField
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    style={{ width: 300 }}
                                    value={password}
                                    placeholder="Password"
                                    required
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
                                    className="update_button"
                                    type="submit"
                                    variant="outline-dark"
                                    >
                                    Update 
                                    </Button>
                                )}
                                </div>
                        </Form>
                      <Button variant="outline-dark" className="delete_btn"  onClick={logout}><FaPowerOff className="power_btn" /><span>Logout</span></Button>
                    </div>
                </div>
            </div>
        </>
    )
}