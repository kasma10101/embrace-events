import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Alert, Box, CircularProgress, Grid, Modal, Typography } from '@mui/material'
import '../style/blogs.css'

export default function Blogs({ equilizer,token,showAddModal, showEditModal, setshowAddModal, setshowEditModal }) {

    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const fetchBlogs = async () => {
        setLoading(true)
        setError('')
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
          setLoading(false)
          if(!blogs.error){
            setBlogs(blogs)
          }
          else{
            setError(blogs.error)
          }
    }
    
    useEffect(() => {
        fetchBlogs()
    }, [token,equilizer])

    return (
        <>
            <div className="blog-whole-body">
                <Typography variant="h3" sx={{textAlign:"center",margin:'15px 0 15px 0'}}>Blogs</Typography>
                <div className="blogs-container">
                    {
                        loading?
                         <Box sx={{height:"90vh",width:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}><CircularProgress/></Box>
                        :
                        <>
                            {blogs.length>0 ? blogs.map((eachBlog, index) => {
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
                            }) : 
                             <>
                               {error?
                                 <Alert severity="error">{error}</Alert>
                               :
                                <Typography>No Blog Found</Typography>
                               }
                             </>}
                        </>
                    }
                </div>
            </div>
            <div style={{ width: '87%', marginTop: 15 }}>
                <Link className="add-blog-button" style={{ border: '1.5px solid #12372a', borderRadius: '15px', padding: '10px 15px', float: 'right', width: 120, textDecoration: 'none', textAlign: 'center' }} 
                   onClick={() => setshowAddModal(true)} to='/blogs/addBlogs'>Add blog</Link>
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
                <Grid sx={{ height: '80vh',overflow: 'hidden'}}>
                    <Outlet />
                </Grid>
            </Modal>
        </>
    )
}