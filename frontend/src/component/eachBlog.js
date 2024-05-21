import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import "../style/eachBlog.css"

export default function EachBlog() {

    const { id } = useParams()
    const [eachBlog, seteachBlog] = useState({
        blogTitle: '',
        blogDescription: '',
        blogImage: null
    })

    const navigate = useNavigate()

    const fetchBlogDetail = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/blogs/${id}`)
            seteachBlog({ ...eachBlog, blogTitle: response.data.blogTitle, blogDescription: response.data.blogDescription, blogImage: response.data.blogImage })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchBlogDetail()
    }, [id])


    return (
        <div className="each-blog">
            <div style={{display: 'flex', justifyContent: 'center', padding: '20px'}}><img className="each-blog-image" src={`http://localhost:5000/Images/${eachBlog.blogImage}`} /></div>
            <div className="each-blog-description">
                <div className="each-blog-title">{eachBlog.blogTitle}</div>
                <div className="title-underline"></div>
                <div>{eachBlog.blogDescription}</div>
            </div>
        </div>
    )
}