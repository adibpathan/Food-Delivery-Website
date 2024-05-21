import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

const createToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET)
}

//register user
const registerUser = async(req, res)=>{
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.json({success: false, message: "All fields are required"})
        }
    
        const exist = await userModel.findOne({email})
        if(exist){
            return res.json({success: false, message: "User Already exist"})
        }
    
        if(!validator.isEmail(email)){
            return res.json({success: false, message: "please enter a valid email"})
        }
    
        if(password.length < 8){
            return res.json({success: false, message: "please enter a strong password"})
        }
    
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
    
        const user = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })
    
        await user.save()
        const token = createToken(user._id)
        res.json({success: true, token})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}


//login user 
const loginUser = async(req, res)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.json({success: false, message: "All fields are required"})
        }

        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success: false, message: "User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.json({success: false, message: "Invalid Credentials"})
        }

        const token = createToken(user._id)
        res.json({success: true, token})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}
export {loginUser, registerUser}