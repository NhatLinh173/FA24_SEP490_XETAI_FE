import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const checkRole = (role, allowedRoles) => {
  return allowedRoles.includes(role);
};

const getRoleFromToken = () => {
 try {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;

    // Thêm log để debug
    console.log("Token from localStorage:", token);

    const decodedToken = jwtDecode(token);
    console.log("Decoded token:", decodedToken);

    // Kiểm tra xem token có hợp lệ không
    if (!decodedToken || !decodedToken.role) {
      console.error("Token không hợp lệ hoặc không có role");
      return null;
    }

    return decodedToken.role;
  } catch (error) {
    console.error("Error decoding token:", error);
    // Thêm xử lý cho token Google
    try {
      const token = localStorage.getItem("accessToken");
      // Nếu là token Google, có thể cần xử lý khác
      if (token && token.includes("google")) {
        // Gán role mặc định cho Google login
        return "customer"; // hoặc role phù hợp với user Google
      }
    } catch (googleError) {
      console.error("Error handling Google token:", googleError);
    }
    return null;
  }
};

const ProtectedRoute = ({ component: Component, allowedRoles, ...rest }) => {
  const userRole = getRoleFromToken();

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
