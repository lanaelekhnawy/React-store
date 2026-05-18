import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../Mainslider/MainSlider";
import toast from "react-hot-toast";
import { Circles } from "react-loader-spinner";
import { Link } from "react-router-dom";
export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  let { addProductToCart } = useContext(CartContext);

  async function addProductItem(id) {
    try {
      let response = await addProductToCart(id);

      console.log("response", response);

      if (response?.data?.status === "success") {
        toast.success(response?.data?.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  async function getProducts() {
    setIsLoading(true);

    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );

      setProducts(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (

<>
{isLoading ? (
      
        <div className="vh-100 d-flex justify-content-center align-items-center bg-light position-fixed w-100 start-0 top-0 z-3">
          <Circles
height="80"
width="80"
color="#4fa94d"
ariaLabel="circles-loading"
wrapperStyle={{}}
wrapperClass=""
visible={true}
          />
        </div>
      ) : (
  
        <div className="container py-5">
          
      
          <div className="mb-5">
            <MainSlider />
          </div>


          <div className="px-2 mb-5">
 
            <CategorySlider />
          </div>

  
          <h2 className="mb-4 fw-bold text-center text-success">
            Latest Products
          </h2>

  
          <div className="row g-4">
            {products.map((productInfo) => (
              <div key={productInfo._id} className="col-md-3">
                <div className="product-card h-100 shadow-sm border-0 card p-2">
                  <Link
                    to={`/productDetails/${productInfo._id}`}
                    className="text-decoration-none text-dark"
                  >
                    <div className="position-relative overflow-hidden">
                      <img
                        src={productInfo.imageCover}
                        className="card-img-top rounded"
                        alt={productInfo.title}
                      />
                    </div>

                    <div className="card-body px-1">
                      <p className="text-success small fw-bold mb-1">
                        {productInfo.category.name}
                      </p>

                      <h6 className="fw-bold mb-2">
                        {productInfo.title.split(" ").slice(0, 2).join(" ")}
                      </h6>

                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <span className="fw-bold text-dark">
                          {productInfo.price} EGP
                        </span>

                        <span className="small text-muted">
                          <i className="fas fa-star text-warning me-1"></i>
                          {productInfo.ratingsAverage}
                        </span>
                      </div>
                    </div>
                  </Link>

                  <button
                    onClick={() => addProductItem(productInfo._id)}
                    className="btn btn-success w-100 mt-2 py-2 shadow-sm"
                  >
                    + Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
  

</>

  );
}

