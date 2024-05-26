const mongoose = require('mongoose');

const EmailOtpRequestSchema = new mongoose.Schema({
  email:  {
    type:String,
    require: true,
    unique:true
  }, 
  otp: { 
    type: String,
    require: true,
  },
},{
  timestamps: true 
});

module.exports = mongoose.model('EmailOtpRequest', EmailOtpRequestSchema);
