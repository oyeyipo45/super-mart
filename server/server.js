import express from "express";
// import data from "./data/data";
import config from "./config";
import mongoose from "mongoose";
import userRoute from "./routes/userRoutes";
import productRoute from "./routes/productRoutes";
import morgan from "morgan";


const app = express();
 

//adding the MONGODBURL TO THE PROCESS.ENV

const  mongodbUrl  = config.MONGODB

//APPLY MIDDLEWARE
app.use(morgan("tiny"))
app.use("/api/products", productRoute)
app.use("/api/users", userRoute)


//body parser middleware
app.use(express.json());


//connecting to MONGO
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
    
})
.then(() => console.log('MongoDB connected..!'))
.catch(error => console.log("error from server",error.reason));





app.listen(5004, () =>{
    console.log("app started at port 5004");
   //console.log(process.env.MONGODB_URL);
    
})


