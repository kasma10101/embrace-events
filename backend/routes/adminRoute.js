const express = require('express');
const router = express.Router();
let {protect}=require("../services/authMiddleWare")
const {
    adminSignUp,
    adminLogIn, 
    getAdminProfile,
    editAdminProfile,
    signUpPermission,
    logout,
} = require('../controllers/admin')

//admin signup
router.post('/signup', adminSignUp)

//admin login
router.post('/login', adminLogIn)

router.get('/signUpPermission', signUpPermission)

//get the profile of the admin
router.get('/adminProfile', protect ,getAdminProfile)

//edit the profile of the admin
router.put('/update', protect, editAdminProfile)

//logout 
router.post('/logout', logout)

module.exports = router