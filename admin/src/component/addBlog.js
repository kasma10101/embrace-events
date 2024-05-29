import axios from "axios";
import { useState } from "react";
import '../style/addBlog.css'
import { Button, Form } from "react-bootstrap";
import { FormGroup, InputLabel, TextField } from "@mui/material";
import { FaFileImage } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AddBlog({ setshowAddModal,token,setEquilizer,equilizer }) {
    const [blog, setBlog] = useState({
        blogTitle: '',
        blogDescription: '',
        blogImage: null
    })
    const [error, setError] = useState({
        blogTitle: false,
        blogDescription: false,
        blogImage: false
    })
    const [previewImage, setPreviewImage] = useState(null)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const fromData = new FormData();
        fromData.append('blogTitle', blog.blogTitle.trim())
        fromData.append('blogDescription', blog.blogDescription.trim())
        fromData.append('file', blog.blogImage)
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}/api/blogs`, fromData,{
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
               },
              }
            )
            setshowAddModal(false)
            setEquilizer(equilizer+2)
        } catch (error) {
            // if (!blog.blogTitle || !blog.blogTitle.trim()) setError((prev) => ({ ...prev, blogTitle: true }));
            // if (!blog.blogDescription || !blog.blogDescription.trim()) setError((prev) => ({ ...prev, blogDescription: true }));
            // if (!blog.blogImage) setError((prev) => ({ ...prev, blogImage: true }));
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setBlog({ ...blog, blogImage: file })
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0])
            reader.onload = () => {
                setPreviewImage(reader.result)
            }
        }
    }


    return (
        <div className="add-blog-container">
            <h1 style={{ color: '#1C3C07' }}>Add Blog</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup style={{ marginTop: 15 }}>
                    <TextField
                        placeholder="Enter Blog Title"
                        onChange={(e) => setBlog({ ...blog, blogTitle: e.target.value })}
                        type="text"
                        style={{ width: 300 }}
                    />
                    {error.blogTitle && <p style={{ fontSize: 10, color: 'red', paddingLeft: '5px', fontFamily: 'nyala' }}>You have to add the title !</p>}
                </FormGroup>
                <FormGroup style={{ marginTop: 10 }}>
                    <TextField
                        placeholder="Enter Blog Description"
                        onChange={(e) => setBlog({ ...blog, blogDescription: e.target.value })}
                        type="text"
                        style={{ width: 300, maxHeight: 200, overflowY: "auto", scrollbarWidth: 'none' }}
                        multiline
                        maxRows={5}
                        minRows={3}
                    />
                    {error.blogDescription && <p style={{ fontSize: 10, color: 'red', paddingLeft: '5px', fontFamily: 'nyala' }}>You have to add the description !</p>}
                </FormGroup>
                <FormGroup style={{ marginTop: 10 }}>
                    <InputLabel style={{ width: 300, border: '.3px solid rgba(0, 0, 0, .2)', padding: '13px', borderRadius: 5 }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><FaFileImage style={{ fontSize: 25 }} /> <span>Add Blog Image</span></span>
                        <TextField
                            placeholder="Enter Blog Image"
                            onChange={handleImageChange}
                            type="file"
                            style={{ display: 'none' }}
                        />
                    </InputLabel>
                    {error.blogImage && <p style={{ fontSize: 10, color: 'red', paddingLeft: '5px', fontFamily: 'nyala' }}>You have to add the image !</p>}
                </FormGroup>
                <Button type="submit" variant="outline-dark" style={{ width: 300, marginTop: 10 }}>Add</Button>
            </Form>
            {previewImage && <div><img src={previewImage} style={{ width: 80, height: 80, marginTop: 10 }} /></div>}
        </div>
    )
}
