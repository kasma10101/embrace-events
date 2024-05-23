const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    adminSignedUp: {
        type: Boolean,
        default: false
    }
})

const adminModel = mongoose.model('admin', adminSchema)
module.exports = adminModel