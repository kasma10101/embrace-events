const Admin = require('../models/adminModel')
const jwt = require('jsonwebtoken')
const JWT_PASSWORD = 'nnnnn'

const adminSignUp =  async (req, res)=>{
    const {username, email, password} = req.body;
    try {
        const adminSignedUp = await Admin.findOne({adminSignedUp: true})
        if (adminSignedUp) {
            return res.status(403).json({message: 'already signed up'})
        }
        else{
            const signedAdmin = await Admin.create({
                username: username,
                password: password,
                adminSignedUp: true
            })
            jwt.sign({adminId: signedAdmin._id, username}, JWT_PASSWORD, {}, (err, token)=>{
                console.log(token);
                if (err) throw err
                res.cookie('token', token, {secure: true, httpOnly: true, sameSite: true}).status(201).json({status: 'SUCCESS'})
            })
        }
    } catch (error) {
        if (error) throw error
        res.status(500).json('err')
    }
}

const adminLogIn = async (req, res) => {

    const {username, password} = req.body;
    try {
        const foundAdmin = await Admin.findOne({username});
        if (foundAdmin) {
            if (password === foundAdmin.password) {
                jwt.sign({adminId: foundAdmin._id, username}, JWT_PASSWORD, {expiresIn: '2d'}, (err, token) => {
                    if (err) throw err;
                    return res.cookie('token', token, {secure: true, sameSite: 'strict', httpOnly: true, path: '/', maxAge: 3600*12000}).status(201).json({adminId: foundAdmin._id, status: 'SUCCESS', token})
                })
            }
            else{
                return res.status(401).json({message: 'incorrect password'})
            }
        }
        else{
            return res.status(404).json({message: 'not found'})
        }
    } catch (error) {
        if (error) throw error;
        res.status(500).json('error')
    }

}

const validateToken = async (req, res)=>{
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ status: 'FAIL', message: 'No token provided' });
    }

    jwt.verify(token, JWT_PASSWORD, (err, decoded) => {
        if (err) {
            return res.status(401).json({ status: 'FAIL', message: 'Failed to authenticate token' });
        }
        return res.status(200).json({ status: 'SUCCESS', adminId: decoded.adminId });
    });
}

const getAdminProfile = async (req, res)=>{
    const {username} = req.body
    try {
        const admin = await Admin.find();
        if (!admin) {
            res.status(404).json({message: 'not found'})
        }
        res.status(200).json(admin)
    } catch (error) {
        res.status(500).json('error')
    }
}

const editAdminProfile = async(req, res)=>{
    const id = req.params.id;
    const {username} = req.body
    try {
        const updateAdmin = await Admin.findByIdAndUpdate(id, req.body)
        res.status(200).json({status: 'SUCCESS', updateAdmin})
    } catch (error) {
        if (error) throw error;
        res.status(500).json('error')
    }
}

const adminSignedUp = async(req, res)=>{
    try {
        const admin = await Admin.findOne({adminSignedUp: true})
        res.status(200).json(admin.adminSignedUp)
    } catch (error) {
        console.log(error);
    }
}

const loggedIn = async (req, res, next)=>{
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token, req.headers);

    if (!token) {
        return res.status(401).json({ status: 'FAIL', message: 'No token provided' });
    }

    jwt.verify(token, JWT_PASSWORD, {expiresIn: '2d'}, (err, decoded) => {
        if (err) {
          return res.status(403).json({ error: 'Failed to authenticate token' });
        }
        res.status(201).json('Verified')
        next();
    });
}

const logout = async (req, res) => {
    res
      .cookie('token', '')
      .status(200)
      .json({ message: 'Logout successful' });
  }

module.exports = {
    adminSignUp,
    adminLogIn, 
    validateToken, 
    getAdminProfile,
    editAdminProfile,
    adminSignedUp,
    logout,
    loggedIn
}