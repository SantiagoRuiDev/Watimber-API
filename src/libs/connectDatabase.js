import mongoose from "mongoose";
import config from './config.js'

export const connectDatabase = async () => {
    try {
        await mongoose.connect(config.URI);
        
        console.log("Database connected successfully");
    } catch (error) {
        return console.log(error.message)
    }
}