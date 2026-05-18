
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";

export default function Carts() {
    // توحيد اسم المتغير ليكون cartProducts
    const [cartProducts, setCartProducts] = useState(null);
    // تأكد من جلب updateProductCount من الـ Context إذا كانت موجودة
    const { getProductToCart, deleteProductFromCart, updateProductCount } = useContext(CartContext);
     let [cartId, setCartId] = useState(null);

    async function getProduct() {
        let { data } = await getProductToCart();
        setCartProducts(data?.data);
        setCartId(data?.data._id);
    }

    async function deleteProduct(id) {
        let response = await deleteProductFromCart(id);
        // تحديث الحالة بعد الحذف
        setCartProducts(response.data.data);
    }

    // إضافة دالة التحديث (Update)
    async function updateProduct(id, count) {
        if (count < 1) return; // منع الكمية من أن تكون أقل من 1
        let response = await updateProductCount(id, count);
        setCartProducts(response.data.data);
    }

    useEffect(() => {
        getProduct();
    }, []);

    return (

        <section className="h-100 bg-light py-5">
  {cartProducts?.products?.length > 0 ? (
    <div className="container">
      <div className="row g-4">
        {/* الجزء الأيسر: قائمة المنتجات */}
        <div className="col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold mb-0 text-dark">Shopping Cart</h3>
            <h6 className="mb-0 text-muted">{cartProducts.products.length} Items</h6>
          </div>

          {cartProducts.products.map((item) => (
            <div key={item.product.id} className="card border-0 shadow-sm rounded-3 mb-3">
              <div className="card-body p-4">
                <div className="row d-flex justify-content-between align-items-center">
                  <div className="col-md-2 col-3">
                    <img src={item.product.imageCover} className="img-fluid rounded-3" alt={item.product.title} />
                  </div>
                  <div className="col-md-3 col-9">
                    <p className="fw-bold mb-1 text-truncate">{item.product.title}</p>
                    <p className="text-muted small mb-0">Unit Price: {item.price} EGP</p>
                  </div>
                  <div className="col-md-3 col-6 d-flex align-items-center my-2 my-md-0">
                    <button className="btn btn-outline-success btn-sm px-2" onClick={() => updateProduct(item.product.id, item.count - 1)}>
                      <i className="fas fa-minus" />
                    </button>
                    <span className="mx-3 fw-bold">{item.count}</span>
                    <button className="btn btn-outline-success btn-sm px-2" onClick={() => updateProduct(item.product.id, item.count + 1)}>
                      <i className="fas fa-plus" />
                    </button>
                  </div>
                  <div className="col-md-2 col-4">
                    <h6 className="mb-0 fw-bold">{item.price * item.count} EGP</h6>
                  </div>
                  <div className="col-md-1 col-2 text-end">
                    <button onClick={() => deleteProduct(item.product.id)} className="btn btn-link text-danger p-0">
                      <i className="fas fa-trash fa-lg" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* الجزء الأيمن: ملخص الطلب (التصميم الجديد) */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 p-2">
            <div className="card-body">
              <h4 className="fw-bold mb-4 border-bottom pb-3">Order Summary</h4>
              
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Subtotal</span>
                <span className="fw-bold">{cartProducts?.totalCartPrice} EGP</span>
              </div>
              
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Shipping</span>
                <span className="text-success fw-bold">Free</span>
              </div>

              <hr className="my-4" />

              <div className="d-flex justify-content-between mb-4">
                <h5 className="fw-bold">Total</h5>
                <h5 className="fw-bold text-success">{cartProducts?.totalCartPrice} EGP</h5>
              </div>

              <Link 
  to={`/checkout/${cartId}`} 
  className="btn btn-success w-100 py-3 fw-bold rounded-3 shadow-sm transition-all hover-shadow d-flex justify-content-center align-items-center text-decoration-none"
>
  Proceed to Checkout
</Link>
              
              
              <div className="mt-3 text-center">
                <small className="text-muted">
                   Complimentary returns within 30 days
                </small>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  ) : (
   
    <div className="text-center py-5">
        <div className="mb-4">
            <i className="fas fa-shopping-cart fa-5x text-success opacity-25 "></i>
        </div>
        <h1 className="text-success fw-bold">Your cart is empty</h1>
        <p className="text-muted">Looks like you haven't added anything to your cart yet.</p>
        
        
        <Link to="/" className="btn btn-success mt-3 px-5 py-2 rounded-pill shadow-sm">
            <i className="fas fa-arrow-left me-2"></i>
            Back to Shopping
        </Link>
    </div>
  )}
</section>
    );
}