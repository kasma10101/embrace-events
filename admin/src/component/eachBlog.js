import { FormGroup, InputLabel, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaFileImage } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom"


export default function EachBlog({ setshowEditModal,token, setEquilizer, equilizer }) {

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
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/api/blogs/${id}`)
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
        // fromData.append('blogTitle', editedBlog.blogTitle)
        // fromData.append('blogDescription', editedBlog.blogDescription)
        // fromData.append('file', editedBlog.blogImage)
        try {
            const response = await axios.put(`${process.env.REACT_APP_BACKEND_API}/api/blogs/${id}`, editedBlog, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
               },
            })
            console.log(response);
            setEquilizer(equilizer+2)
            setshowEditModal(false)

        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.delete(`${process.env.REACT_APP_BACKEND_API}/api/blogs/${id}`, {  headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
           } })
            console.log(response);
            setshowEditModal(false)
            setEquilizer(equilizer+2)

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            {
                edit ?
                    <div className="each-blog">
                        <Form onSubmit={handleSubmit} >
                            <div style={{ maxHeight: '70vh', overflowY: 'auto', scrollbarWidth: 'none' }}>
                                <FormGroup >
                                    <InputLabel>
                                        {previewImage ? 
                                           <div style={{ display: 'flex', justifyContent: 'center' }}>
                                             <img src={previewImage}  style={{height: '300px', width: '100%'}} className="each-blog-image" />
                                          </div> : 
                                          <div style={{ display: 'flex', justifyContent: 'center'}}>
                                             <img className="each-blog-image" style={{height: '300px', width: '100%'}} src={`${process.env.REACT_APP_BACKEND_API}/${editedBlog.blogImage}`} />
                                        </div>}
                                       
                                    </InputLabel>
                                </FormGroup>

                                <FormGroup style={{ marginTop: 20, paddingLeft: 20 }}>
                                    <TextField
                                        value={editedBlog.blogTitle}
                                        onChange={(e) => setEditedBlog({ ...editedBlog, blogTitle: e.target.value })}
                                        type="text"
                                        className="edit-input"
                                        multiline
                                    />
                                </FormGroup>
                                <FormGroup style={{ marginTop: 20, paddingLeft: 20 }}>
                                    <TextField
                                        value={editedBlog.blogDescription}
                                        onChange={(e) => setEditedBlog({ ...editedBlog, blogDescription: e.target.value })}
                                        type="text"
                                        className="edit-input"
                                        multiline
                                    />
                                </FormGroup>
                            </div>
                            <Button type="submit" variant="outline-dark" className="edit-button" style={{ width: 300 }}>Edit</Button>
                        </Form>
                    </div> :
                    <div className="each-blog">
                        <div style={{ maxHeight: '70vh', overflowY: 'auto', scrollbarWidth: 'none' }}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <img className="each-blog-image" src={`${process.env.REACT_APP_BACKEND_API}/${editedBlog.blogImage}`} />
                          </div>
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