const SubscribedEmail = require('../models/subscribedEmails');


const addEmail = async (req, res) => {
    try {
        const {email} = req.body
        const emailExist = await SubscribedEmail.findOne({email:email})
        if(emailExist) return res.status(400).json({ error: 'Email Already Subscribed' });
         
        await SubscribedEmail.create({email:email})
        res.status(200).json({msg:"Successfuly Subscribed"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSubscribedEmails = async (req, res) => {
    try {
        if(!req.user)  return res.status(404).json({error:"Not Authorized"})
       const allEmails = await SubscribedEmail.find();
        res.status(200).json(allEmails)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports={
    addEmail,
    getSubscribedEmails,
}