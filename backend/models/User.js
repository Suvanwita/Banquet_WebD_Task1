const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')

const userSchema= new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String
    }
},{timestamps:true});

const User=new mongoose.model("User",userSchema)
module.exports={User}