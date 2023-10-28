import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const AdminOnly = ({ children }) => {
  const { token, typeUser } = useAuth();
  if (!token || typeUser != "administrador") {
    return <Navigate to="/" />;
  }
  return children;
};
