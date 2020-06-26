// const express = require("express");
// const app = express();

// const data = require('./data/data.js')
import express from "express";
import data from "./data/data";
import config from "./config";
import dotenv from "dotenv";
import mongoose from "mongoose"


const app = express();
 

//adding the MONDBURL TO THE PROCESS.ENV
dotenv.config();
const mongodbUrl = config.MONGODB_URL;

//connecting to MONGO
mongoose.connect(mongodbUrl,{
    useNewUrlParser: true 
}).catch(error => console.log(error.reason));




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
    console.log(process.env);
    
})


