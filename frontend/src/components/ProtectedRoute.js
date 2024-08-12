import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, role, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token'); // Check for authentication token
  const userRole = localStorage.getItem('role'); // Get the user's role from local storage

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated && userRole === role ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
