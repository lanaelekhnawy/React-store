


import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
  let { id } = useParams();
  const [details, setDetails] = useState(null);
  let { addProductToCart } = useContext(CartContext);

    async function addProductItem(id) {

        let response = await addProductToCart(id);

        console.log(response);

        if (response?.data?.status == 'success') {

            toast.success(response?.data?.message);

        }
        else {

            toast.error(response.data.message);

        }
    }

    function getProductDetails() {

        axios
            .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            .then(({ data }) => {

                console.log(data.data);
                setDetails(data.data);

            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        getProductDetails();
    }, [id]);

    return (
        <>
            <div className="container py-5">

                {details ? (

                    <div className="row g-5 align-items-start">

                      
                        <div className="col-md-5">

                            <div className="product-image-container p-2 shadow-sm rounded-4 bg-white">

                                <img
                                    src={details.imageCover}
                                    className="w-100 rounded-4"
                                    alt={details.title}
                                    style={{
                                        objectFit: "contain",
                                        maxHeight: "500px"
                                    }}
                                />

                            </div>

                        </div>

         
                        <div className="col-md-7">

                            <div className="ps-md-4">

                                <nav aria-label="breadcrumb">

                                    <ol className="breadcrumb mb-2">

                                        <li className="breadcrumb-item text-success fw-bold">
                                            {details.category?.name}
                                        </li>

                                    </ol>

                                </nav>

                                <h1 className="h2 fw-bold mb-3 text-dark">
                                    {details.title}
                                </h1>

                                <div className="d-flex align-items-center mb-4">

                                    <div className="badge bg-warning text-dark me-3 px-3 py-2 rounded-pill">

                                        <i className="fas fa-star me-1"></i>

                                        {details.ratingsAverage}

                                    </div>

                                    <span className="text-muted small">
                                        ({details.ratingsQuantity} Reviews)
                                    </span>

                                </div>

                                <div className="mb-4">

                                    <h5 className="fw-bold">
                                        Description
                                    </h5>

                                    <p className="text-secondary lh-lg">
                                        {details.description}
                                    </p>

                                </div>

                                <hr className="my-4 text-muted opacity-25" />

                                <div className="d-flex justify-content-between align-items-center mt-4 p-4 bg-light rounded-4 shadow-sm">

                                    <div>

                                        <p className="text-muted small mb-0">
                                            Total Price
                                        </p>

                                        <h3 className="fw-bold text-success mb-0">

                                            {details.price}

                                            <span className="h6 text-muted">
                                                {" "}EGP
                                            </span>

                                        </h3>

                                    </div>

                                    <button
                                        onClick={() => addProductItem(details.id)}
                                        className="btn btn-success btn-lg px-5 py-3 rounded-3 shadow-sm border-0 fw-bold"
                                    >

                                        <i className="fas fa-cart-plus me-2"></i>

                                        Add To Cart

                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                ) : (

                    <div className="vh-100 d-flex justify-content-center align-items-center">

                        <div
                            className="spinner-border text-success"
                            role="status"
                        ></div>

                    </div>

                )}

            </div>












            
        </>
    );
}