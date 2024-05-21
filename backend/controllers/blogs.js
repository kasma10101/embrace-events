const express = require('express')
const Blogs = require('../models/blogModel')
const fs = require('fs')
const path = require('path')


const getBlogs = async (req, res)=>{
    try {
        const blogs = await Blogs.find();
        res.status(200).json(blogs)
    } catch (error) {
        res.status(500).json('error')
    }
}

const createBlog = async (req, res) => {
    const { blogTitle, blogDescription, blogImage } = req.body;
    try {
        let filename = null
        if (blogImage) {
            const base64Data = blogImage.name.split(';base64,').pop();
            const ext = base64Data.split('.')[1];
            filename = `${Date.now()}.${ext}`;
            const filepath = path.join(__dirname, 'Images', filename);
            const bufferData = Buffer.from(blogImage.data.split(',')[1], 'base64')
            fs.writeFile(filepath, bufferData, (err) => {
                if (err) throw err
                console.log(`File saved to ${filepath}`);
            });
        }

        else filename = null
        console.log(filename);
        const blog = await Blogs.create({
            blogTitle: blogTitle,
            blogDescription: blogDescription,
            blogImage: blogImage ? filename : null
        })
        res.status(201).json({status: 'SUCCESS', blog })
    } catch (error) {
        res.status(500).json(error)
    }
}

const editBlog = async(req, res)=>{
    const id = req.params.id;
    const {blogTitle, blogImage, blogDescription} = req.body;
    try {
        let filename = null;
        if (blogImage&&blogImage.data?.startsWith('data:image')) {
            const base64Data = blogImage.name.split(';base64,').pop();
            const ext = base64Data.split('.')[1];
            filename = `${Date.now()}.${ext}`;
            const filepath = path.join(__dirname, 'Images', filename);
            const bufferData = Buffer.from(blogImage.data.split(',')[1], 'base64');

            fs.writeFileSync(filepath, bufferData, (err) => {
                if (err) throw err
                console.log(`File saved to ${filepath}`);
            });
        }
        const updateData = {
            blogTitle: blogTitle,
            blogDescription: blogDescription,
            ...(blogImage && { blogImage: filename }),
        };
        const editedBlog = await Blogs.findByIdAndUpdate(id, updateData)
        res.status(200).json({status: 'SUCCESS', editedBlog})
    } catch (error) {
        if (error) throw error
        res.status(500).json('error')
    }
}

const deleteBlog = async(req, res)=>{
    try {
        const deletedBlog = await Blogs.findByIdAndDelete(req.params.id, req.body)
        res.status(200).json(deletedBlog)
    } catch (error) {
        res.status(500).json('error')
    }
}

const getBlogDetail = async(req, res)=>{
    try {
        const eachBlog = await Blogs.findById(req.params.id);
        res.status(200).json(eachBlog)
    } catch (error) {
        res.status(500).json('error')
    }
}

module.exports = {
    getBlogs,
    createBlog,
    editBlog,
    deleteBlog,
    getBlogDetail
}