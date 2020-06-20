// const express = require("express");
// const app = express();

// const data = require('./data/data.js')
import express from "express";
import data from "./data/data";
const app = express();


app.get("/api/products", async (req, res, next) => {
    try {
        res.send(data.products);
        // console.log("data", data);
        
    } catch (error) {
        next(error)
    }
});


app.get(`/api/products/:id`, async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const product = data.products.find(product => product.id === productId );
        res.send(product);
    } catch (error) {
        next(error)
    }
});



app.listen(5004, () =>{
    console.log("app started at port 5004");
    
})


