import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
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

// info: api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);

app.get("/test-cookie", (req, res) => {
    res.cookie("testToken", "abc123", {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 60 * 1000, // 1 minute
    });
    res.status(200).json({ message: "Test cookie sent!" });
});


app.listen(PORT,() => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
    
})