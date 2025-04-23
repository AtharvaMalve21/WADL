import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext.jsx";

const ProtectedRoutes = ({ children }) => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <div>{isLoggedIn ? children : <Navigate to={"/login"} replace />}</div>
  );
};

export default ProtectedRoutes;
