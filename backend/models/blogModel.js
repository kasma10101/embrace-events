const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    blogTitle: {
        type: String,
        required: true
    },
    blogDescription: {
        type: String,
        required: true
    },
    blogImage:{
        type: String,
        required: true
    },
    
}, {
    timestamps: true
})

const blogModel = mongoose.model('blogs', blogSchema)
module.exports = blogModel