import express from "express";
import data from "./data/data";
import config from "./config";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/userRoutes";
import morgan from "morgan"
import path from 'path';


const app = express();
 

//adding the MONDBURL TO THE PROCESS.ENV
dotenv.config();
const mongodbUrl = config.MONGODB_URL;


//connecting to MONGO
mongoose.connect(mongodbUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
    
}).catch(error => console.log(error.reason));

//APPLY MIDDLEWARE
app.use(morgan("tiny"))
app.use("/api/users", userRoute)

//SERVE STATIC BUILD FOLDER IF IM PRODUCTION
if(process.env.NODE_ENV === "production") {
    //set static folder
    app.use(express.statis('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirName, 'client', 'build', 'index.html'));
    })
}


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
    // console.log(process.env);
    
})


