import { connectDB } from "../utils/db.js";
import app from "./app.js";
import 'dotenv/config';
import dotenv from "dotenv";
dotenv.config();
const Port = process.env.PORT || 5000;
const startServer = async()=>{

    try{

        await connectDB()
        app.listen(Port,()=>{
            console.log(`Server is running on port ${Port}`);
        })

    }
    catch(err){
        console.log("Error starting server:", err);
    }

}

startServer();