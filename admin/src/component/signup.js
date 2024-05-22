import { FormGroup, TextField } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import { Button, Form, Nav } from "react-bootstrap"
import { FaUser } from "react-icons/fa"
import { useNavigate } from "react-router-dom"


export default function Signup (){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            const response = axios.post('http://localhost:3001/signup', {username, password})
            navigate('/')
        } catch (error) {
         console.log(error);   
        }
    }

    return(
        <>
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
                    <Button className="login-button" type="submit" variant="outline-dark">Signup</Button>
                </Form>
                <Nav.Link href="/login" style={{textAlign: 'center'}}>login</Nav.Link>
            </div>
        </div>
        </>
    )
}