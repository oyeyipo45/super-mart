import mongoose from "mongoose";

<<<<<<< HEAD

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    category: {type: String, required: true,},
    image: {type: String, required: true},
    price: {type: String, required: true},
    brand: {type: String, required: true,},
    rating: {type: String, required: true},
    numReviews: {type: String, required: true},
    countInStock: {type: String, required: true}

    

});



const productModel = mongoose.model(`products`, productSchema)

export default productModel;
=======
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, default: 0, required: true },
  brand: { type: String, required: true },
  rating: { type: Number, default: 0, required: true },
  numReviews: { type: Number, default: 0, required: true },
  countInStock: { type: Number, default: 0, required: true },
});

const productModel = mongoose.model("products", productSchema);

export default productModel;
>>>>>>> 5f1c4562987e65f84c5388460663a46ba72fd013
