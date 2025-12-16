const mongoose = require("mongoose")
const dotenv=require("dotenv");
dotenv.config();
const MONGOURL = process.env.MONGOURL;
const connectDB = async () => {
    try{
        await mongoose.connect(MONGOURL);
        console.log("Database Connected Successfully");
    }
    catch(error){
        console.log("Database Connection Failed",error);
        process.exit(1);
    }
}   
module.exports = connectDB;