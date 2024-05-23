import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Grid, Modal } from '@mui/material'
import '../style/blogs.css'

export default function Blogs({ token,showAddModal, showEditModal, setshowAddModal, setshowEditModal }) {

    const [blogs, setBlogs] = useState([])
    const navigate = useNavigate()

    const fetchBlogs = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_BACKEND_API}/api/blogs`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const blogs = await response.json();
          console.log(blogs);
    }
    
    useEffect(() => {
        fetchBlogs()
    }, [blogs])

    return (
        <>
            <div className="blog-whole-body">
                <div className="blogs-container">
                    {blogs ? blogs.map((eachBlog, index) => {
                        return (
                            <Link onClick={() => setshowEditModal(true)} className="each-blog-container" to={`${eachBlog._id}`} key={index}>
                                <div><img className="blog-image" src={`http://localhost:5000/${eachBlog.blogImage}`} /></div>
                                <div className="each-blog-container-description">
                                    <div className="each-blog-container-title">{eachBlog.blogTitle.length>10?eachBlog.blogTitle.slice(0, 10) + '...' : eachBlog.blogTitle}<div className="title-underline"></div></div>
                                    <div>{eachBlog.blogDescription.length > 55 ? eachBlog.blogDescription.slice(0, 55) + '...' : eachBlog.blogDescription}</div>
                                </div>
                                    <div style={{ float: "right", fontSize: 13, padding: 10 }}>{new Date(eachBlog?.createdAt).toLocaleString()}</div>
                            </Link>
                        )
                    }) : <></>}
                </div>
            </div>
            <div style={{ width: '87%', marginTop: 15 }}>
                <Link className="add-blog-button" style={{ border: '1.5px solid #12372a', borderRadius: '15px', padding: '10px 15px', float: 'right', width: 120, textDecoration: 'none', textAlign: 'center' }} onClick={() => setshowAddModal(true)} to='/blogs/addBlogs'>Add blog</Link>
            </div>
            <Modal open={showAddModal} onClose={
                () => {
                    setshowAddModal(false)
                    navigate('/blogs')
                }
            } className="blog-modal">
                <Grid>
                    <Outlet />
                </Grid>
            </Modal>
            <Modal open={showEditModal} onClose={
                () => {
                    setshowEditModal(false)
                    navigate('/blogs')
                }} className="blog-modal">
                <Grid>
                    <Outlet />
                </Grid>
            </Modal>
        </>
    )
}