import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-light text-dark py-5 mt-5 border-top">
      <div className="container">
        <div className="row g-4">
          
        
          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold text-success mb-3">FreshCart</h5>
            <p className="text-muted">
              Get deliveries with FreshCart in as little as 1 hour. Your favorite grocery store at your fingertips.
            </p>
            <div className="social-icons d-flex gap-3">
              <a href="#" className="text-success fs-5"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-success fs-5"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-success fs-5"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-success fs-5"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>

          
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/" className="text-decoration-none text-muted">Products</Link></li>
              <li className="mb-2"><Link to="/brands" className="text-decoration-none text-muted">Brands</Link></li>
              <li className="mb-2"><Link to="/carts" className="text-decoration-none text-muted">My Cart</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3">Contact Us</h6>
            <ul className="list-unstyled text-muted">
              <li className="mb-2"><i className="fas fa-envelope me-2 text-success"></i> support@freshcart.com</li>
              <li className="mb-2"><i className="fas fa-phone me-2 text-success"></i> +1 234 567 890</li>
              <li className="mb-2"><i className="fas fa-map-marker-alt me-2 text-success"></i> Cairo, Egypt</li>
            </ul>
          </div>

         
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3">Install App</h6>
            <p className="small text-muted">Available on Google Play & App Store</p>
            <div className="d-flex gap-2 flex-column">
               <button className="btn btn-dark btn-sm d-flex align-items-center justify-content-center py-2">
                  <i className="fab fa-apple fs-4 me-2"></i> App Store
               </button>
               <button className="btn btn-dark btn-sm d-flex align-items-center justify-content-center py-2">
                  <i className="fab fa-google-play fs-5 me-2"></i> Google Play
               </button>
            </div>
          </div>

        </div>

        <hr className="my-4 text-muted" />

        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0 text-muted small">
              © 2026 <span className="fw-bold text-success">FreshCart</span>. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
            <span className="me-3 small text-muted">Payment Partners:</span>
            <i className="fab fa-cc-visa me-2 fs-4 text-muted"></i>
            <i className="fab fa-cc-mastercard me-2 fs-4 text-muted"></i>
            <i className="fab fa-cc-paypal fs-4 text-muted"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}