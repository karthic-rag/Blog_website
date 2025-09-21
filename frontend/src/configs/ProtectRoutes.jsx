import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

const ProtectRoutes = ({ children, role }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-blue-700 text-lg font-semibold">Loading...</span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  if (!role) {
    return children;
  }

  if (role && user.role !== role) {
    return <Navigate to={"/unauthorized"} replace />;
  }

  return children;
};

export default ProtectRoutes;
