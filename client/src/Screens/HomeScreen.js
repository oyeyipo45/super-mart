import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { listProducts } from "../redux/actions/productActions";

const HomeScreen = (props) => {
  // const [products, setProducts] = useState([]);

  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
    // const fetchData = async () => {
    //   const { data } = await axios.get("/api/products");
    //   setProducts(data);
    // };
    // fetchData();

    return () => {
      //
    };
  }, []);

  return loading ? (
    <div>loading .... </div>
  ) : error ? (
    <div> {error} </div>
  ) : (
    <div>
      <div className="slides">
        <div className="landing-background-image-container">
          {/* <img className="landing-background-image" src="https://res.cloudinary.com/dsipecjov/image/upload/v1595942562/omk96jkkfvnh1nsnhca2.jpg" alt="serene marina" /> */}
          <div className="landing-text-container">
            <h3 className="landing-background-text-heading">SHOP WITH US</h3>

            <p className="landing-background-text-body">
              " et iusto odio dignissimos ducimus qui blanditiis praesentium
              voluptatum deleniti atque corrupti quos d iusto odio dignissimos
              ducimus qui blanditiis praesentium voluptatum deleniti atque
              corrupti
            </p>

            <button
              className="landing-background-text-button"
              id="explore-button"
            >
              {" "}
              Explore{" "}
            </button>
          </div>
        </div>
      </div>
      <ul className="products">
        {products.map((product) => (
          <li key={product._id}>
            <div className="product">
              <Link to={`/product/${product._id}`}>
                {" "}
                <img
                  className="product-image"
                  src={product.image}
                  alt="products"
                />
              </Link>

              <div className="product-name">
                <Link to={`/product/${product._id}`}>{product.name}</Link>
              </div>
              <div className="product-brand">{product.price}</div>
              <div className="product-price"> {product.price}</div>
              <div className="product-rating">
                {product.rating} Stars ({product.numReviews} Reviews){" "}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeScreen;
