import express from "express";
import Product from '../models/productModel';


const router = express.Router();


// router.get("/", async (req, res) => {
//     try {
        
//       const products = await Product.find()
      
 
//      res.send(products)
//     } catch (error) {
//         console.log(error);
//     }
//  });

 
// router.get("/:id", async (req, res) => {
//    try {
//    const product = await Product.findById(req.params.id)
// //.then((product) => res.json(product));
// if(product)
//          res.send(product);
//      else 
//      res.status(404).send({message: "product not found"})
        

// } catch (error) {
//        console.log(error);
       
//    }
//   });
  
   
 



router.get("/", async (req, res, next) => {
    const products = await Product.find()
    
    try {
        res.send(products);
    } catch (error) {
        next(error)
    }
});


router.get("/:id", async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    try {
        
    if(product)
        res.send(product);
        
    else 
    res.status(404).send({message: "product not found"})
    console.log(product)
    
    } catch (error) {
        next(error)
    }
});



export default router;