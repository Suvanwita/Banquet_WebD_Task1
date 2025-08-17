const mongoose=require('mongoose')
const dotenv=require('dotenv')
const axios=require('axios')

const {User}=require('./models/User')
const {Question}=require('./models/Question')
const {Category}=require('./models/Category')

dotenv.config()

const connectDB=require('./config/db')

const seedData=async()=>{
    try{
        const {data}=await axios.get('https://test-data-gules.vercel.app/data.json')
        await Question.deleteMany();
        await Category.deleteMany();

        const allQuestions=data.data.flatMap((category)=>category.ques.map(q=>({
            title:q.title,
            difficulty:q.difficulty,
            url:q.yt_link
        })));
        const insertedQuestions=await Question.insertMany(allQuestions);

        const categories=data.data.map((category)=>({
            title:category.title,
            questions: insertedQuestions
                        .filter((q)=>category.ques.some((cq)=>cq.title===q.title))
                        .map((q)=>q._id),
        }))

        await Category.insertMany(categories);
        console.log("Successfully seeded")
    }
    catch(err){
        console.log("Seeding error: ",err.message)
    }
}

connectDB().then(seedData)

