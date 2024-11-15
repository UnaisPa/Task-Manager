import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthPrivateRoute = ({ children }) => {
  // Check for token in localStorage
  const token = localStorage.getItem('token');

  // If no token, redirect to login page
  if (token) {
    return <Navigate to="/" />;
  }else if(!token){
    return children;
  }

  // If token exists, render the child component (protected route)
  
};

export default AuthPrivateRoute;
