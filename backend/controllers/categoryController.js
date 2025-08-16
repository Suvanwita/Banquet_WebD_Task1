const {Question}=require('../models/Question')
const {Category}=require('../models/Category')

const getCategories=async(req,res)=>{
    try{
        const search=req.query.search||"";
        const difficulty=req.query.difficulty||"";
        const page=parseInt(req.query.page)||1;
        const limit=parseInt(req.query.limit)||15;
        const skip=(page-1)*limit;

        let quesFilter={};
        if(search){
            quesFilter.title={$regex:search,$options:'i'}
        }
        if(difficulty){
            quesFilter.difficulty=difficulty
        }

        const categories=await Category.find().populate({
            path:"questions",
            match:quesFilter,
            options:{skip,limit}
        });

        const totalQuestions=await Question.countDocuments(quesFilter);

        res.json({
            page,
            limit,
            totalQuestions,
            totalPages: Math.ceil(totalQuestions/limit),
            categories
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Error occurred."})
    }
}

module.exports={getCategories}