import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

const mongoDBConnect= ()=>{
    try{
        mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB connected');
    }catch(err){
        console.log("Error while connecting to the database")
    }
}

export default mongoDBConnect;