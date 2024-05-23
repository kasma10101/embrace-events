const express = require('express');
const router = express.Router();

const {
    adminSignUp,
    adminLogIn, 
    validateToken, 
    getAdminProfile,
    editAdminProfile,
    adminSignedUp,
    logout,
    loggedIn
} = require('../controllers/admin')

//admin signup
router.post('/signup', adminSignUp)

//admin login
router.post('/login', adminLogIn)

router.post('/validate-token', validateToken)

//get the profile of the admin
router.get('/adminProfile', getAdminProfile)

//edit the profile of the admin
router.put('/update/:id', editAdminProfile)

//get the admin signedup once
router.get('/admin-signed-up', adminSignedUp)

//get the loggedin admin
router.get('/logged-in', loggedIn)

//logout 
router.post('/logout', logout)

module.exports = router