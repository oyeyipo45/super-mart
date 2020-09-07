import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createProduct } from "../redux/actions/productActions";
import { clearErrors } from "../redux/actions/errorAction";

const CreateProductScreen = (props) => {
    
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [numReviews, setNumReviews] = useState("");
 
//   const createProduct = useSelector((state) => state.createProduct);
  const error = useSelector((state) => state.error);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    
e.preventDefault()
    //CREATE NEW PRODUCTS

    
      const newProduct = {
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
        rating,
        numReviews
      };

      dispatch(clearErrors());

      //REGISTER USER
      dispatch(createProduct(newProduct));

  };

//   useEffect(() => {
    // if (error.id === "createProduct_FAIL") {
    //   setErrorMessage({ message: error.message.message });
    // } else {
    //   setErrorMessage({ message: null });
    // }

    //IF AUTHENTICATED REDIRECT TO HOME
    // if (isAuthenticated) {
    //   return props.history.push("/");
    // }

    // return () => {};

    // [error.message.message, isAuthenticated]
//   }, []);

  const clearErrorAlert = () => {
    dispatch(clearErrors());
  };

  return (
    <div className="form signin-form">
      <form onSubmit={submitHandler}>
        <ul className="form-container ">
          <li>Create Product</li>
          <li>
            {error.id ? (
              <div className="alert alert-danger alert-dismissible fade show">
                {/* <button
                  type="button"
                  onClick={clearErrorAlert}
                  className="close"
                  data-dismiss="alert"
                >
                  &times;
                </button> */}
                {error.message.message}
              </div>
            ) : null}
          </li>
          <li className="email-container">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </li>
          <li className="email-container">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              name="price"
              id="price"
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
            ></input>
          </li>
          <li className="email-container">
            <label htmlFor="Brand">Brand</label>
            <input
              type="text"
              name="Brand"
              id="Brand"
              placeholder="Brand"
              onChange={(e) => setBrand(e.target.value)}
            ></input>
          </li>
          <li className="email-container">
            <label htmlFor="Image">Image</label>
            <input
              type="text"
              name="Image"
              id="Image"
              placeholder="Image"
              onChange={(e) => setImage(e.target.value)}
            ></input>
          </li>
          <li className="email-container">
            <label htmlFor="Category">Category</label>
            <input
              type="text"
              name="Category"
              id="Category"
              placeholder="Category"
              onChange={(e) => setCategory(e.target.value)}
            ></input>
          </li>
         
          <li className="email-container">
            <label htmlFor="CountInStock">CountInStock</label>
            <input
              type="text"
              name="CountInStock"
              id="CountInStock"
              placeholder="CountInStock"
              onChange={(e) => setCountInStock(e.target.value)}
            ></input>
          </li>
          <li className="email-container">
            <label htmlFor="Description">Description</label>
            <textarea
            type="text"
            name="Description"
            id="Description"
            placeholder="description"
            onChange={(e) => setDescription(e.target.value)}
            >

            </textarea>
          </li>
          <li className="email-container">
            <label htmlFor="Rating">Rating</label>
            <input
              type="text"
              name="Rating"
              id="Rating"
              placeholder="Rating"
              onChange={(e) => setRating(e.target.value)}
            ></input>
          </li>
          <li className="email-container">
            <label htmlFor="numReview">numReview</label>
            <input
              type="text"
              name="numReview"
              id="numReview"
              placeholder="numReview"
              onChange={(e) => setNumReviews(e.target.value)}
            ></input>
          </li>

          <li>
            <button type="submit" className="signin-button">
              Create
            </button>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default CreateProductScreen;
