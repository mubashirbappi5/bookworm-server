import app from "./app.js";

const Port = process.env.PORT || 5000;
const startServer = async()=>{

    try{
        app.listen(Port,()=>{
            console.log(`Server is running on port ${Port}`);
        })

    }
    catch(err){
        console.log("Error starting server:", err);
    }

}

startServer();