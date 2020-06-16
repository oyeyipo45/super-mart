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



app.listen(5004, () =>{
    console.log("app started at port 5004");
    
})


