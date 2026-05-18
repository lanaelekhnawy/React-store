import React from 'react';
import { Link } from 'react-router-dom';
import errorImg from '../../assets/images/error.svg'; 

export default function NotFound() {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-75">
          <div className="col-md-6 text-center">
            
            
            <div className="mb-4">
              <img 
                src={errorImg} 
                alt="Page Not Found" 
                className="img-fluid w-75 animate__animated animate__pulse animate__infinite" 
              />
            </div>

     
            <h1 className="fw-bold text-success display-4">Oops! Page Not Found</h1>
            <p className="text-muted fs-5 mb-4">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>

           
            <Link 
              to="/" 
              className="btn btn-success btn-lg px-5 py-2 rounded-pill shadow-sm transition-all hover-scale"
            >
              <i className="fas fa-home me-2"></i>
              Back to Homepage
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
}