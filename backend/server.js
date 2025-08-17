const express=require('express')
const dotenv=require('dotenv')
const cors=require('cors')
const connectDB=require('./config/db')

dotenv.config()

const app=express();
app.use(cors());
app.use(express.json());

const categoryRoutes=require('./routes/categoryRoutes')
app.use('/api/categories',categoryRoutes)

const PORT=process.env.PORT||5000;

const startServer=async()=>{
    try{
        await connectDB();
        app.listen(PORT,()=>{
            console.log(`Server running on port ${PORT}`)
        })
    }
    catch(err){
        console.log("Failed in starting server",err.message);
    }
}

startServer();
