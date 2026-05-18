import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 

export default function Allorders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getUserOrders() {
        try {
          
            const token = localStorage.getItem('userToken');
            const { id } = jwtDecode(token);

            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
            
            setOrders(data);
            setLoading(false);
        } catch (error) {
            console.log("Error ", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getUserOrders();
    }, []);

    if (loading) return <div className="py-5 text-center"><i className="fas fa-spinner fa-spin fa-3x text-success"></i></div>;

    return (
        <div className="container py-5">
            <h2 className="fw-bold mb-4 text-success"><i className="fas fa-shopping-bag me-2"></i>My Orders</h2>
            
            {orders.length > 0 ? (
                <div className="row g-4">
                    {orders.map((order) => (
                        <div key={order.id} className="col-12">
                            <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
                                <div className="card-header bg-success text-white py-3 d-flex justify-content-between align-items-center">
                                    <span className="fw-bold">Order ID: #{order.id}</span>
                                    <span className="badge bg-light text-success px-3 py-2 rounded-pill">
                                        {order.isPaid ? "Paid" : "Cash on Delivery"}
                                    </span>
                                </div>
                                <div className="card-body p-4">
                                    <div className="row">
                                       
                                        <div className="col-md-8">
                                            <div className="d-flex flex-wrap gap-3">
                                                {order.cartItems.map((item) => (
                                                    <div key={item._id} className="text-center" style={{width: '100px'}}>
                                                        <img 
                                                            src={item.product.imageCover} 
                                                            className="img-fluid rounded-3 mb-2 shadow-sm" 
                                                            alt={item.product.title} 
                                                        />
                                                        <p className="small text-truncate mb-0">{item.product.title}</p>
                                                        <span className="badge bg-secondary">Quantity: {item.count}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    
                                        <div className="col-md-4 border-start text-end">
                                            <p className="text-muted mb-1">Total Price</p>
                                            <h4 className="fw-bold text-success">{order.totalOrderPrice} EGP</h4>
                                            <hr />
                                            <p className="mb-1 small"> {order.isDelivered ? "Delivered" : ""}</p>
                                            <p className="small"><strong>Payment:</strong> {order.paymentMethodType}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-5">
                    <h3>No orders found yet.</h3>
                </div>
            )}
        </div>
    );
}