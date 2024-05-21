import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"


export default function EachBlog() {

    const { id } = useParams()
    const [editedBlog, setEditedBlog] = useState({
        blogTitle: '',
        blogDescription: '',
        blogImage: null
    })

    const navigate = useNavigate()

    const fetchBlogDetail = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/blogs/${id}`)
            setEditedBlog({ ...editedBlog, blogTitle: response.data.blogTitle, blogDescription: response.data.blogDescription, blogImage: response.data.blogImage })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchBlogDetail()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const fromData = new FormData()
        fromData.append('blogTitle', editedBlog.blogTitle)
        fromData.append('blogDescription', editedBlog.blogDescription)
        fromData.append('file', editedBlog.blogImage)
        try {
            const response = await axios.put(`http://localhost:5000/api/blogs/${id}`, fromData)
            console.log(response);
            navigate('/blogs')
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.delete(`http://localhost:5000/api/blogs/${id}`, { withCredentials: true })
            console.log(response);
            navigate('/blogs')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input value={editedBlog.blogTitle} onChange={(e) => setEditedBlog({ ...editedBlog, blogTitle: e.target.value })} />
                <input value={editedBlog.blogDescription} onChange={(e) => setEditedBlog({ ...editedBlog, blogDescription: e.target.value })} />
                <input type="file" placeholder=" blog image" onChange={(e)=>setEditedBlog({...editedBlog, blogImage: e.target.files[0]})} />
                <button type="submit">Edit</button>
                <button onClick={handleDelete}>delete</button>
            </form>
        </>
    )
}