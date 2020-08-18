import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { listProducts } from "../redux/actions/productActions";
import LandingPageCarousel from "./LandingPageCarousel";

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
    <div className="loadingScreen">
      <div class="spinner-border text-info" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  ) : error ? (
    <div>error</div>
  ) : (
    <div>
      <LandingPageCarousel />
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
