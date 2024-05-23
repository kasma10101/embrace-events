import { TextField } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Form, FormGroup } from "react-bootstrap"
import { useNavigate } from "react-router-dom"


export default function Profile() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [adminId, setAdminId] = useState('')
    const navigate = useNavigate()

    const fetchAdminDetail = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/adminProfile');
            setUsername(response.data[0].username);
            setPassword(response.data[0].password);
            setAdminId(response.data[0]._id);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = axios.put(`http://localhost:5000/api/admin/update/${adminId}`, { username, password })
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        fetchAdminDetail()
    }, [adminId])

    const logout = () => {

        axios.post('http://localhost:5000/api/admin/logout')
            .then(() => {
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <div style={{ paddingTop: '15%' }}>
                <div className="login-container">
                    <div style={{ marginTop: '10%' }}>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup style={{ marginTop: 30 }}>
                                <TextField
                                    onChange={(e) => setUsername(e.target.value)}
                                    type="text"
                                    style={{ width: 300 }}
                                    value={username}
                                />
                            </FormGroup>
                            <FormGroup style={{ marginTop: 15 }}>
                                <TextField
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    style={{ width: 300 }}
                                    value={password}
                                />
                            </FormGroup>
                            <Button className="login-button" type="submit" variant="outline-dark">Save</Button>
                        </Form>
                    <Button className="login-button" variant="outline-dark" style={{marginTop: '10px'}}  onClick={logout}>Logout</Button>
                    </div>
                </div>
            </div>
        </>
    )
}