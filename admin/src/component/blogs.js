import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Grid, Modal } from '@mui/material'
import '../style/blogs.css'

export default function Blogs({showAddModal, showEditModal, setshowAddModal, setshowEditModal}) {

    const [blogs, setBlogs] = useState([])
    
    const fetchBlogs = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/blogs');
            setBlogs(response.data);
        } catch (error) {
            console.log(error);
        }
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
                            <Link onClick={()=>setshowEditModal(true)} className="each-blog-container" to={`${eachBlog._id}`} key={index}>
                                <div><img className="blog-image" src={`http://localhost:5000/${eachBlog.blogImage}`} /></div>
                                <div className="each-blog-container-description">
                                    <div className="each-blog-container-title">{eachBlog.blogTitle}<div className="title-underline"></div></div>
                                    <div>{eachBlog.blogDescription.split(' ').length > 15 ? eachBlog.blogDescription.split(' ').slice(0, 15).join(' ') + '...' : eachBlog.blogDescription}</div>
                                </div>
                            </Link>
                        )
                    }) : <></>}
                </div>
            </div>
            <Link onClick={()=>setshowAddModal(true)} to='/blogs/addBlogs'>Add blog</Link>
            <Modal open={showAddModal} onClose={()=>setshowAddModal(false)} className="blog-modal">
                <Grid>
                    <Outlet />
                </Grid>
            </Modal>
            <Modal open={showEditModal} onClose={()=>setshowEditModal(false)} className="blog-modal">
                <Grid>
                    <Outlet />
                </Grid>
            </Modal>
        </>
    )
}