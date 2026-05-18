import React from "react";
import PropTypes from 'prop-types';
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes(props) {
    
    if (localStorage.getItem('userToken') !== null) {
        return props.children;
    } 
    
  
    return <Navigate to="/Login" />;
}