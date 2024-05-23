const express = require('express')
const Blogs = require('../models/blogModel')
const fs = require('fs')

const getBlogs = async (req, res)=>{
    try {
        const blogs = await Blogs.find();
        res.status(200).json(blogs)
    } catch (error) {
        res.status(500).json('error')
    }
}

const createBlog = async (req, res) => {
    const { blogTitle, blogDescription, createdAt } = req.body;
    try {
        const blog = await Blogs.create({
            blogTitle: blogTitle,
            blogDescription: blogDescription,
            blogImage: req.file.filename,
            createdAt
        })
        console.log(req.file.filename );
        res.status(201).json({status: 'SUCCESS', blog })
    } catch (error) {
        res.status(500).json(error)
    }
}

const editBlog = async(req, res)=>{
    const id = req.params.id;
    const {blogTitle, blogDescription} = req.body;
    try {
        const updateData = {
            blogTitle: blogTitle,
            blogDescription: blogDescription,
            blogImage: req?.file?.filename
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