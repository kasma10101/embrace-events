const express = require('express')
const Blogs = require('../models/blogModel')
const fs = require('fs')

const getBlogs = async (req, res)=>{
    try {
        const blogs = await Blogs.find();
        res.status(200).json(blogs)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Please check your internate connection.'})
    }
}

const createBlog = async (req, res) => {
    const { blogTitle, blogDescription } = req.body;
    if(!req.user)  return res.status(404).json({error:"Not Authorized"})
    try {
        const blog = await Blogs.create({
            blogTitle: blogTitle,
            blogDescription: blogDescription,
            blogImage: req.file.filename,
        })
        res.status(201).json({msg: 'Successfuly created' })
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Please check your internate connection.'})
    }
}

const editBlog = async(req, res)=>{
    const id = req.params.id;
    const {blogTitle, blogDescription} = req.body;
    console.log('====================================');
    console.log(blogTitle,id);
    console.log('====================================');
    if(!req.user)  return res.status(404).json({error:"Not Authorized"})
    try {
        const updateData = {
            blogTitle: blogTitle,
            blogDescription: blogDescription,
        };
        const editedBlog = await Blogs.findByIdAndUpdate(id, updateData)
        res.status(200).json({msg: 'Successfuly updated',})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Please check your internate connection.'})
    }
}

const deleteBlog = async(req, res)=>{
    try {
        if(!req.user)  return res.status(404).json({error:"Not Authorized"})
        const deletedBlog = await Blogs.findByIdAndDelete(req.params.id, req.body)
        res.status(200).json(deletedBlog)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Please check your internate connection.'})
    }
}

const getBlogDetail = async(req, res)=>{
    try {
        const eachBlog = await Blogs.findById(req.params.id);
        res.status(200).json(eachBlog)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Please check your internate connection.'})
    }
}

module.exports = {
    getBlogs,
    createBlog,
    editBlog,
    deleteBlog,
    getBlogDetail
}