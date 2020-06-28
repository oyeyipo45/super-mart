import express from "express";
import data from "./data/data";
import config from "./config";

import mongoose from "mongoose";
import userRoute from "./routes/userRoutes";
import morgan from "morgan";


const app = express();
 

//adding the MONGODBURL TO THE PROCESS.ENV

const  mongodbUrl  = config.MONGODB

//connecting to MONGO
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
    
})
.then(() => console.log('MongoDB connected..!'))
.catch(error => console.log("error from server",error.reason));

//APPLY MIDDLEWARE
app.use(morgan("tiny"))
app.use("/api/users", userRoute)


app.get("/api/products", async (req, res, next) => {
    try {
        res.send(data.products);
        // console.log("data", data);
        
    } catch (error) {
        next(error)
    }
});


app.get("/api/products/:id", async (req, res, next) => {
    try {
        const productId = req.params.id;
        const product = data.products.find(prod => prod._id === productId );
    //    console.log(data.products);
       
        // res.send(product);
        console.log(product);
    if(product)
        res.send(product);
    else 
    res.status(404).send({message: "product not found"})
        
    } catch (error) {
        next(error)
    }
});


app.listen(5004, () =>{
    console.log("app started at port 5004");
   //console.log(process.env.MONGODB_URL);
    
})


