import mongoose from 'mongoose';
import { configKeys } from '../config/keys';

mongoose.set("strictQuery", true)

const connect = async()=>{
    try{
        await mongoose.connect(configKeys.MONGODB_URL)
        console.log("Database connected successfully")
            
        
    }catch(error){
        console.log(`Database connection error : ${error}`)
        process.exit(1)
    }
}

export default {connect};


