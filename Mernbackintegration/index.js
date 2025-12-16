const express= require("express");
const ProductRoute=require("./routes/ProductRoute");
const dotenv=require("dotenv");
const connectDB = require("./config/db");
dotenv.config();
connectDB();
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/api",ProductRoute);
const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`); 
});