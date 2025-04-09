import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
dotenv.config({});



const app = express();


// info: middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOption = {
    origin: 'http://localhost:5173',
    credentials: true
}

app.use(cors(corsOption));

const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
    
})