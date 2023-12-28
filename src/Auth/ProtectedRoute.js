// ProtectedRoute.js
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

// // ProtectedRoute.js
// import React, { Component } from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { useAuth } from './AuthProvider';

// const ProtectedRoute = ({ rest }) => {
//     const { isAuthenticated } = useAuth();

//     // return isAuthenticated() ? <Route {...props} /> : <Navigate to="/login" />;

//     return (
//         <Route
//             {...rest}
//             render={(props) =>
//                 isAuthenticated() ? (
//                     <Component {...props} />
//                 ) : (
//                     <Navigate
//                         to="/login"
//                     />
//                 )
//             }
//         />
//     )
// };

// export default ProtectedRoute;
