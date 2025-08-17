const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const {User}=require('../models/User')

const register=async(req,res)=>{
    try{
        const {name,email,password}=req.body;

        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message:"User already registered."
            })
        }

        const saltRounds=10;
        const hashedPassword=await bcrypt.hash(password,saltRounds);

        const newUser=await User.create({name,email,password:hashedPassword});

        const token=await jwt.sign({
                id:newUser._id,
                email:newUser.email
            },
            process.env.JWT_SECRET_KEY,
            {expiresIn:process.env.JWT_EXPIRES}
        );

        res.status(201).json({
            message:"User registered successfully",
            token,
            user:{
                id:newUser._id,
                email:newUser.email,
            }
        })
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}


const login=async(req,res)=>{
    try{
        const {email,password}=req.body;

        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"User not registered."
            })
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                message:"Invalid username/password"
            })
        }

        const token=await jwt.sign({
                id:user._id,
                email:user.email
            },
            process.env.JWT_SECRET_KEY,
            {expiresIn:process.env.JWT_EXPIRES}
        );

        res.json({
            message:"User logged in successfully",
            token,
            user:{
                id:user._id,
                email:user.email
            }
        })
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

module.exports={register,login}