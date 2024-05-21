const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    blogTitle: {
        type: String,
        required: true
    },
    blogDescription: String,
    blogImage:{
        type: String,
        required: true
    }
}, {timestamp: true})

const blogModel = mongoose.model('blogs', blogSchema)
module.exports = blogModel