import { FormGroup, InputLabel, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaFileImage } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import "../style/eachBlog.css";

export default function EachBlog({
  setshowEditModal,
  token,
  setEquilizer,
  equilizer,
}) {
  const { id } = useParams();
  const [editedBlog, setEditedBlog] = useState({
    blogTitle: "",
    blogDescription: "",
    blogImage: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  const fetchBlogDetail = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/api/blogs/${id}`
      );
      setEditedBlog({
        ...editedBlog,
        blogTitle: response.data.blogTitle,
        blogDescription: response.data.blogDescription,
        blogImage: response.data.blogImage,
      });
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchBlogDetail();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fromData = new FormData();
    // fromData.append('blogTitle', editedBlog.blogTitle)
    // fromData.append('blogDescription', editedBlog.blogDescription)
    // fromData.append('file', editedBlog.blogImage)
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_API}/api/blogs/${id}`,
        editedBlog,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEquilizer(equilizer + 2);
      setshowEditModal(false);
    } catch (error) {
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_API}/api/blogs/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setshowEditModal(false);
      setEquilizer(equilizer + 2);
    } catch (error) {
    }
  };

  return (
    <>
      {edit ? (
        <div className="each-blog">
          <Form onSubmit={handleSubmit}>
            <div
              style={{
                maxHeight: "70vh",
                overflowY: "auto",
                scrollbarWidth: "none",
                marginTop: "25px",
              }}
            >
              <FormGroup>
                <InputLabel>
                  {previewImage ? (
                    <img
                      src={previewImage}
                      style={{
                        height: "300px",
                        width: "100%",
                        objectFit: "contain",
                      }}
                      className="each-blog-image"
                    />
                  ) : (
                    <img
                      className="each-blog-image"
                      style={{
                        height: "300px",
                        width: "100%",
                        objectFit: "contain",
                      }}
                      src={`${process.env.REACT_APP_BACKEND_API}/${editedBlog.blogImage}`}
                    />
                  )}
                </InputLabel>
              </FormGroup>

              <FormGroup style={{ marginTop: 20, paddingLeft: 20 }}>
                <TextField
                  value={editedBlog.blogTitle}
                  onChange={(e) =>
                    setEditedBlog({ ...editedBlog, blogTitle: e.target.value })
                  }
                  type="text"
                  className="edit-input"
                  multiline
                />
              </FormGroup>
              <FormGroup style={{ marginTop: 20, paddingLeft: 20 }}>
                <TextField
                  value={editedBlog.blogDescription}
                  onChange={(e) =>
                    setEditedBlog({
                      ...editedBlog,
                      blogDescription: e.target.value,
                    })
                  }
                  type="text"
                  className="edit-input"
                  multiline
                />
              </FormGroup>
            </div>
            <div className="btn">
              <Button
                type="submit"
                variant="outline-dark"
                className="update_button"
              >
                Edit
              </Button>
            </div>
          </Form>
        </div>
      ) : (
        <div className="each-blog">
          <div
            style={{
              maxHeight: "80vh",
              overflowY: "auto",
              scrollbarWidth: "none",
              marginTop: "25px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                className="each-blog-image"
                src={`${process.env.REACT_APP_BACKEND_API}/${editedBlog.blogImage}`}
              />
            </div>
            <div className="each-blog-description">
              <div className="each-blog-title">{editedBlog.blogTitle}</div>
              <div className="title-underline"></div>
              <div style={{ marginTop: 20, whiteSpace: "break-spaces" }}>
                {editedBlog.blogDescription}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "20px",
              margin: "20px auto",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Button
              variant="outline-dark"
              onClick={() => setEdit(true)}
              className="edit_blog_btn"
            >
              Edit
            </Button>
            <Button
              variant="outline-dark"
              onClick={handleDelete}
              className="delete_blog_btn"
            >
              Delete
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
