const express = require('express');
const router = express.Router();
let {protect}=require("../services/authMiddleWare")
const {
    addEmail,
    getSubscribedEmails, 
} = require('../controllers/subscribedEmailCoontroller')

//admin signup
router.post('/addEmail', addEmail)
router.get('/getAllEmails', protect ,getSubscribedEmails)


module.exports = router