import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const checkRole = (role, allowedRoles) => {
  console.log("Checking role:", role);
  console.log("Allowed roles:", allowedRoles);
  return allowedRoles.includes(role);
};

const getRoleFromToken = () => {
  try {
    const userRole = localStorage.getItem("userRole");
    if (userRole) return userRole;

    const token = localStorage.getItem("accessToken");
    if (!token) return null;

    const decodedToken = jwtDecode(token);
    return decodedToken.role;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const ProtectedRoute = ({ component: Component, allowedRoles, ...rest }) => {
  const userRole = getRoleFromToken();
  console.log("Current user role:", userRole);
  console.log("Required roles:", allowedRoles);
  return (
    <Route
      {...rest}
      render={(props) =>
        userRole ? (
          checkRole(userRole, allowedRoles) ? (
            <Component {...props} />
          ) : (
            <Redirect to="/unauthorized" />
          )
        ) : (
          <Redirect to="/signIn" />
        )
      }
    />
  );
};

export default ProtectedRoute;
