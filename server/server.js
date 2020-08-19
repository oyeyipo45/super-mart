import express from "express";
// import data from "./data/data";
import config from "./config";
import mongoose from "mongoose";
import userRoute from "./routes/userRoutes";
import productRoute from "./routes/productRoutes";
import morgan from "morgan";
import path from "path"


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


//SERVE STATIC BUILD FOLDER IF IM PRODUCTION
if(process.env.NODE_ENV === "production") {
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirName, 'client', 'build', 'index.html'));
    })
}




app.listen(5004, () =>{
    console.log("app started at port 5004");
  // console.log(process.env.SECRET);
    
})


