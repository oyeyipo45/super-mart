import express from "express";
import Product from "../models/productModel";
import { auth } from "../middleware/auth";

const router = express.Router();

//GETTING ALL THE PRODUCTS
router.get("/", async (req, res, next) => {
  const products = await Product.find({});

  try {
    res.send(products);
  } catch (error) {
    next(error);
  }
});

//GETTING CLICKED PRODUCT
router.get("/:id", async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  try {
    if (product) res.send(product);
    else res.status(404).send({ message: "product not found" });
   
  } catch (error) {
    next(error => {error.message, "here"});
  }
});

router.post("/",auth, async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description
  });

  

  const newProduct = await product.save();

 
  if (newProduct) {
    return res
      .status(201)
      .send({ message: "New Product Created", data: newProduct });
      
  } else {
    return res.status(500).send({ message: "Error in Creating Product" });
  }

   
 
  
});

export default router;
