const mongoose=require('mongoose')

const categorySchema=new mongoose.Schema({
    title:{
        type:String,
    },
    questions:{
        type:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Question"
            }
        ]
    }
});

const Category=new mongoose.model("Category",categorySchema);
module.exports={Category}
