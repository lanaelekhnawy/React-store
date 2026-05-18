import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik"; // يفضل استخدام formik للسهولة

export default function Checkout() {
    let { cartId } = useParams();
    
    let headers = {
        token: localStorage.getItem('userToken')
    };

    async function handleCheckout(formsData) {
        try {
            // لاحظ استخدام الباك-تيك ` هنا
            let { data } = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
                { 
                    shippingAddress: formsData 
                },
                {
                    headers: headers,
                    params: { url: 'http://localhost:5173' } 
                }
            );

            console.log('checkout response', data);
            if (data.status === "success") {
                window.location.href = data.session.url; 
            }
        } catch (error) {
            console.log('error', error);
        }
    }

  
    let formik = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: ''
        },
        onSubmit: handleCheckout
    });

    return (
        <div className="container py-5">
            <div className="mx-auto bg-light p-5 shadow-sm rounded-4" style={{ maxWidth: '600px' }}>
                <h2 className="fw-bold mb-4 text-success">Shipping Address</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="details" className="form-label">Details</label>
                        <input type="text" className="form-control" id="details" name="details" onChange={formik.handleChange} value={formik.values.details} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input type="tel" className="form-control" id="phone" name="phone" onChange={formik.handleChange} value={formik.values.phone} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="city" className="form-label">City</label>
                        <input type="text" className="form-control" id="city" name="city" onChange={formik.handleChange} value={formik.values.city} />
                    </div>

                    <button type="submit" className="btn btn-success w-100 py-2 mt-3 fw-bold">
                        Pay Now (Visa)
                    </button>
                </form>
            </div>
        </div>
    );
}