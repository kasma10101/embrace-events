// models/SubscribedEmailModel.js
const mongoose = require('mongoose');

const SubscribedEmailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique:true,
    },
   
},{
    timestamps: true 
  });

const SubscribedEmail = mongoose.model('SubscribedEmail', SubscribedEmailSchema);

module.exports = SubscribedEmail;