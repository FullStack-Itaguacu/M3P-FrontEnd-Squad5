import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const AdminOnly = ({ children }) => {
  const { token, isAdmin } = useAuth();
  if (!token || isAdmin == "N") {
    return <Navigate to="/" />;
  }
  return children;
};
