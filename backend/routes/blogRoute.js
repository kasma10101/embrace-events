const express = require('express');
const router = express.Router();

const {
    getBlogs,
    createBlog,
    editBlog,
    deleteBlog,
    getBlogDetail
} = require('../controllers/blogs')

//get blogs posted
router.get('/', getBlogs);

//add new blog
router.post('/', createBlog);

//edit a blog
router.put('/:id', editBlog);

//delete a blog
router.delete('/:id', deleteBlog);

//get the detail of a blog
router.get('/:id', getBlogDetail);

module.exports = router