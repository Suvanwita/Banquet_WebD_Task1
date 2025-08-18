const jwt=require('jsonwebtoken')
const {User}=require('../models/User')

const protect=async(req,res,next)=>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token=req.headers.authorization.split(" ")[1];
            const decoded=await jwt.verify(token,process.env.JWT_SECRET_KEY);
            req.user=await User.findById(decoded.id).select("-password");
            return next();
        }
        catch(err){
            res.status(401).json({
                message:"Not authorized"
            })
        }
    }

    if(!token){
        res.status(401).json({
            message:"Not authorized, no token found"
        })
    }
}

module.exports={protect}