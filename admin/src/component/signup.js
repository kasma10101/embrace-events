import axios from "axios"
import { useState } from "react"
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
        <form onSubmit={handleSubmit}>
            <input onChange={(e)=>setUsername(e.target.value)} placeholder="username" />
            <input onChange={(e)=>setPassword(e.target.value)} placeholder="password"/>
            <button type="submit">Signup</button>
        </form>
        </>
    )
}