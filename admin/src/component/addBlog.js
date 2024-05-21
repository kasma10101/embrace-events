import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function AddBlog() {
    const [blog, setBlog] = useState({
        blogTitle: '',
        blogDescription: '',
        blogImage: null
    })

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const fromData = new FormData();
        fromData.append('blogTitle', blog.blogTitle)
        fromData.append('blogDescription', blog.blogDescription)
        fromData.append('file', blog.blogImage)
        try {
            const response = await axios.post('http://localhost:5000/api/blogs', fromData)
            console.log(response);
            navigate('/blogs')
            setBlog({ blogTitle: response.data.blogTitle, blogDescription: response.data.blogDescription, blogImage: response.data.blogImage });
        } catch (error) {
            console.log(error);
        }
    }

    const sendImage = (e) => {
        const reader = new FileReader();
        e.target.files[0] && reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            setBlog({ ...blog, blogImage: { name: e.target.files[0].name, data: reader.result } })
        }
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <input placeholder="blog title" onChange={(e) => setBlog({ ...blog, blogTitle: e.target.value })} />
                <input placeholder="blog description" onChange={(e) => setBlog({ ...blog, blogDescription: e.target.value })} />
                <input placeholder="blog image" type="file" onChange={(e)=>setBlog({...blog, blogImage: e.target.files[0]})} />
                <button type="submit">add</button>
            </form>
        </>
    )
}
