import { FormGroup, InputLabel, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaFileImage } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom"


export default function EachBlog({ setshowEditModal }) {

    const { id } = useParams()
    const [editedBlog, setEditedBlog] = useState({
        blogTitle: '',
        blogDescription: '',
        blogImage: null
    })
    const [previewImage, setPreviewImage] = useState(null)

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
            setshowEditModal(false)

        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.delete(`http://localhost:5000/api/blogs/${id}`, { withCredentials: true })
        } catch (error) {
            console.log(error);
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setEditedBlog({ ...editedBlog, blogImage: file })
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0])
            reader.onload = () => {
                setPreviewImage(reader.result)
            }
        }
    }

    return (
        <div className="edit-blog-container">
            <h1 style={{ color: '#1C3C07' }}>Edit Blog</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup style={{ marginTop: 20 }}>
                    <TextField
                        value={editedBlog.blogTitle}
                        onChange={(e) => setEditedBlog({ ...editedBlog, blogTitle: e.target.value })}
                        type="text"
                        style={{ width: 300 }}
                    />
                </FormGroup>
                <FormGroup style={{ marginTop: 20 }}>
                    <TextField
                        value={editedBlog.blogDescription}
                        onChange={(e) => setEditedBlog({ ...editedBlog, blogDescription: e.target.value })}
                        type="text"
                        style={{ width: 300 }}
                        multiline
                    />
                </FormGroup>
                <FormGroup style={{ marginTop: 20 }}>
                    <InputLabel style={{ width: 300, border: '.3px solid rgba(0, 0, 0, .2)', padding: '13px', borderRadius: 5 }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><FaFileImage style={{ fontSize: 25 }} /> <span>Edit Blog Image</span></span>
                        <TextField
                            onChange={handleImageChange}
                            type="file"
                            style={{ display: 'none' }}
                        />
                    </InputLabel>
                </FormGroup>
                <Button type="submit" variant="outline-dark" style={{ width: 300, marginTop: 20 }}>Edit</Button>
            </Form>
            <Button variant="outline-dark" style={{ width: 300, marginTop: 20 }} onClick={handleDelete}>Delete</Button>
            {previewImage ? <div><img src={previewImage} style={{ width: 80, height: 80, marginTop: 20 }} /></div> : <div><img style={{ width: 80, height: 80, marginTop: 20 }} src={`http://localhost:5000/${editedBlog.blogImage}`} /></div>}
        </div>
    )
}