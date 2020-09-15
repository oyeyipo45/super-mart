import express from "express";
import cors from "cors"
import config from "./config";
import mongoose from "mongoose";
import userRoute from "./routes/userRoutes";
import orderRoute from "./routes/orderRoutes";
import productRoute from "./routes/productRoutes";
import morgan from "morgan";
import path from "path";


const app = express();
 

//adding the MONGODBURL TO THE PROCESS.ENV

const  mongodbUrl  = config.MONGODB



//body parser middleware
app.use(express.json());


//APPLY MIDDLEWARE
app.use(cors())
app.use(morgan("tiny"))
app.use("/api/products", productRoute)
app.use("/api/users", userRoute)
app.use('/api/orders', orderRoute);
app.use('/api/config/paypal', (req, res) => {
    res.send(config.PAYPAL_CLIENT_ID)
});



//SETTING HEADERS FOR CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    next();
  });

//connecting to MONGO
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
    
})
.then(() => console.log('MongoDB connected..!'))
.catch(error => console.log("error from server",error.reason));


//SERVE STATIC BUILD FOLDER IF IN PRODUCTION
if(process.env.NODE_ENV === "production") {
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirName, 'client', 'build', 'index.html'));
    })
}



app.listen(5004, () =>{
    console.log("app started at port 5004");
  
    
})


