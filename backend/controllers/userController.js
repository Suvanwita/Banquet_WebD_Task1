const {User}=require('../models/User')
const {Question}=require('../models/Question');
const { default: mongoose } = require('mongoose');

const addProgress=async(req,res)=>{
    try{
        const {questionId,completed}=req.body;
        const user=await User.findById(req.user._id);

        const existing=await user.progress.find(p=>p.question.toString()===questionId);
        if(existing)
            existing.completed=completed;
        else
            user.progress.push({question:questionId,completed});

        await user.save();
        res.json({
            message:"User progress saved",
            progress:user.progress
        })
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
}

const getBookmarks=async(req,res)=>{
    try{
        const user=await User.findById(req.user._id).populate('bookmarks')
        res.json({
            bookmarks:user.bookmarks
        })
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

const toggleBookmark=async(req,res)=>{
    try{
        const questionId=req.params.id
        const user=await User.findById(req.user._id)

        const alreadyBookmarked=user.bookmarks.some(b=>b.toString()===questionId)

        if(alreadyBookmarked){
            user.bookmarks=user.bookmarks.filter(b=>b.toString()!==questionId)
            await user.save()
            res.json({message:"Bookmark removed",bookmarks:user.bookmarks})
        }else{
            user.bookmarks.push(new mongoose.Types.ObjectId(questionId))
            await user.save()
            const updatedUser=await User.findById(req.user._id).populate("bookmarks");
            res.json({message:"Bookmarked",bookmarks:updatedUser.bookmarks})
        }
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

module.exports={addProgress,getBookmarks,toggleBookmark}