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
    const [edit, setEdit] = useState(false)
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
        navigate('/blogs')
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
            navigate('/blogs')
            setshowEditModal(false)
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
        <>
            {
                edit ?
                    <div className="each-blog">
                        <Form onSubmit={handleSubmit} >
                            <div style={{ height: '70vh', overflowY: 'auto', scrollbarWidth: 'none' }}>
                                <FormGroup style={{ marginTop: 20 }}>
                                    <InputLabel>
                                        {previewImage ? <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}><img src={previewImage} className="each-blog-image" /></div> : <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}><img className="each-blog-image" src={`http://localhost:5000/${editedBlog.blogImage}`} /></div>}
                                        <TextField
                                            onChange={handleImageChange}
                                            type="file"
                                            style={{ display: 'none' }}
                                        />
                                    </InputLabel>
                                </FormGroup>
                                <FormGroup style={{ marginTop: 20, paddingLeft: 20 }}>
                                    <TextField
                                        value={editedBlog.blogTitle}
                                        onChange={(e) => setEditedBlog({ ...editedBlog, blogTitle: e.target.value })}
                                        type="text"
                                        style={{ width: 300 }}
                                    />
                                </FormGroup>
                                <FormGroup style={{ marginTop: 20, paddingLeft: 20 }}>
                                    <TextField
                                        value={editedBlog.blogDescription}
                                        onChange={(e) => setEditedBlog({ ...editedBlog, blogDescription: e.target.value })}
                                        type="text"
                                        style={{ width: 300 }}
                                        multiline
                                    />
                                </FormGroup>
                            </div>
                            <Button type="submit" variant="outline-dark" style={{ width: 300, margin: '20px 0px 20px 40px' }}>Edit</Button>
                        </Form>
                    </div> :
                    <div className="each-blog" style={{ borderBottom: '1px solid #12372a' }}>
                        <div style={{ height: '70vh', overflowY: 'auto', scrollbarWidth: 'none' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}><img className="each-blog-image" src={`http://localhost:5000/${editedBlog.blogImage}`} /></div>
                            <div className="each-blog-description">
                                <div className="each-blog-title">{editedBlog.blogTitle}</div>
                                <div className="title-underline"></div>
                                <div style={{ marginTop: 20 }}>{editedBlog.blogDescription}</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '20px', margin: '20px auto', width: 220 }}>
                            <Button variant="outline-dark" onClick={() => setEdit(true)} style={{ width: 100 }}>Edit</Button>
                            <Button variant="outline-dark" onClick={handleDelete} style={{ width: 100 }}>Delete</Button>
                        </div>
                    </div>
            }
        </>
    )
}