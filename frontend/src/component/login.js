import {  useState } from "react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from "react-cookie"


export default function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const [cookies, setCookies] = useCookies(['token'])
console.log(cookies);
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/admin/login', { username, password }, {withCredentials: true})
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
        <>
            <form onSubmit={handleSubmit}>
                <input placeholder="username" onChange={(e) => setUsername(e.target.value)} />
                <input placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </>
    )
}