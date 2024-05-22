import { useState } from "react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from "react-cookie"
import '../style/login.css'
import { Button, Form, Nav } from "react-bootstrap"
import { FormGroup, TextField } from '@mui/material'
import { FaUser } from 'react-icons/fa'


export default function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const [cookies, setCookies] = useCookies(['token'])
    console.log(cookies);
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/admin/login', { username, password }, { withCredentials: true })
            .then(result => {
                if (result.data.status === "SUCCESS") {
                    console.log(result);
                    setCookies('token', result.data.token)
                    navigate('/')
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="login-container">
            <div className="user-icon" >
                <FaUser style={{ fontSize: 80, color: '#fff' }} />
            </div>
            <div style={{marginTop: '10%'}}>
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
                            placeholder="Enter Password"
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            style={{ width: 300 }}
                        />
                    </FormGroup>
                    <Button className="login-button" type="submit" variant="outline-dark">Login</Button>
                </Form>
                <Nav.Link href="/signup" style={{textAlign: 'center'}}>Signup</Nav.Link>
            </div>
        </div>
    )
}