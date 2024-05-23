import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import '../style/blogs.css'
import { Grid, Modal } from '@mui/material'

export default function Blogs() {

    const [blogs, setBlogs] = useState([])

    const fetchBlogs = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/blogs');
            setBlogs(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        fetchBlogs()
    }, [blogs])

    return (
        <>
            <div className="blog-whole-body">
                <div className="blogs-container">
                    {blogs ? blogs.map((eachBlog, index) => {
                        return (
                            <Link onClick={()=>setShowModal(true)} to={`${eachBlog._id}`} className="each-blog-container" key={index}>
                                <div><img className="blog-image" src={`http://localhost:5000/${eachBlog.blogImage}`} /></div>
                                <div className="each-blog-container-description">
                                    <div className="each-blog-container-title">{eachBlog.blogTitle}<div className="title-underline"></div></div>
                                    <div>{eachBlog.blogDescription.length > 55 ? eachBlog.blogDescription.slice(0, 55) + '...' : eachBlog.blogDescription}</div>
                                    <div style={{ float: "right", fontSize: 13, padding: 10 }}>{new Date(eachBlog?.createdAt).toLocaleString()}</div>
                                </div>
                            </Link>
                        )
                    }) : <></>}
                </div>
            </div>
            <Modal open={showModal} onClose={()=>setShowModal(false)} className="blog-modal">
                <Grid>
                    <Outlet />
                </Grid>
            </Modal>
        </>
    )
}