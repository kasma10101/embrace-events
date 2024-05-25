const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require('path')
let {protect}=require("../services/authMiddleWare")
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'Images')
    },
    filename: (req, file, cb)=>{
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage: storage})

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
router.post('/', protect, upload.single('file'), createBlog);

//edit a blog
router.put('/:id', protect, editBlog);

//delete a blog
router.delete('/:id', protect, deleteBlog);

//get the detail of a blog
router.get('/:id', getBlogDetail);

module.exports = router