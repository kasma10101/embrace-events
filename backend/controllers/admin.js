const Admin = require('../models/adminModel')
const jwt = require('jsonwebtoken')
let bcrypt=require("bcryptjs")


let generalTokn=(id)=>{
    return jwt.sign({id}, process.env.JWT_TOKEN,{expiresIn:'30d'}
)
}


const adminSignUp =  async (req, res)=>{
    let {username, email, password} = req.body;

    try {
        const adminSignedUp = await Admin.findOne({adminSignedUp: true})
        if (adminSignedUp) {
            return res.status(403).json({error: 'Already signed up'})
        }        
        //hash pasword
        const saltRounds = 10;
        let salt = bcrypt.genSaltSync(saltRounds);
        let hashedPassword = bcrypt.hashSync(password, salt);
        password=hashedPassword     
    

        await Admin.create({
                username: username,
                password: password,
                adminSignedUp: true,
                email:email
            })
        return res.status(200).send({msg:"Successfuly Created !!"})
            
        
    } catch (error) {
        if (error) throw error
        return res.status(500).json({error:error.message||"Check your internate connection and try again"})
    }
}

const adminLogIn = async (req, res) => {

    const {email, password} = req.body;

    try {
        if(!email || !password) return res.status(400).send({ error: "Invalid data" });
        const foundAdmin = await Admin.findOne({email});
        if(!foundAdmin) return res.status(404).json({error:"Invalid Email"})
        if(await bcrypt.compare(password,foundAdmin.password)){
            const token = generalTokn(foundAdmin._id);
            res.cookie("authToken", token, { httpOnly: true });
            return res.status(200).send({ token: token });
        }
        return res.status(400).send({ error: "Incorrect Password" });
                
       
    } catch (error) {
        if (error) throw error;
        return res.status(500).json({error:"Check your internate connection then try again"})
    }

}

const getAdminProfile = async (req, res)=>{
    try{
        if(!req.user) return res.status(404).send({error:"Admin not found"})

        return res.status(200).send(req.user)//look at the network  

    }catch(error){ res.status(501).send({error:"internal server error"})}
}

const signUpPermission = async (req, res)=>{
    try{
        const admin =await Admin.find()
        return res.status(200).send({isAllowed:admin.length===0}) 

    }catch(error){ res.status(501).send({error:"internal server error"})}
}


const editAdminProfile = async(req, res)=>{
  const saltRounds = 10;
  let {email,password,username}=req.body
  
  //console.log(req.body);
  const isValidEmail = (email) => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(email);
    }
 if(!req.user) return res.status(404).send({error:"Admin not found"})

  try{
      let existUser=await Admin.findOne({_id:req?.user?._id})

      if(!existUser) return res.status(404).json({error:"Admin not found"})
          
      if(email){
              if(!isValidEmail(email)) return res.status(400).json({error:"invalid email"})
              let userFound=await Admin.findOne({email:email})
              if(userFound && userFound._id.toString()!==req.user._id.toString()) return res.status(400).json({error:"This email is already taken"})
         
        }

      if(username&&username?.length<3) return res.status(400).json({error:"invalid username"})
      if(password){
                  if(password.length<3) return res.status(400).json({error:"invalid password"})
                  let salt = bcrypt.genSaltSync(saltRounds);
                  let hashedPassword = bcrypt.hashSync(password, salt);    
                  req.body.password=hashedPassword
          }
         
        await Admin.updateOne({_id:req?.user._id},{$set:req.body})
        res.status(200).json({msg:"Successfuly updated"})
   }catch(error){ res.status(501).json({errors:error,error:"internal server error"})}

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
    getAdminProfile,
    editAdminProfile,
    signUpPermission,
    logout,
}