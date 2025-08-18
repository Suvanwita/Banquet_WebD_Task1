const express=require('express')
const {addProgress, getBookmarks, toggleBookmark}=require('../controllers/userController')
const {protect}=require('../middleware/authMiddleware')

const router=express.Router()

router.post('/progress',protect,addProgress);
router.get('/bookmarks',protect,getBookmarks);
router.post('/bookmarks/:id',protect,toggleBookmark);

module.exports=router