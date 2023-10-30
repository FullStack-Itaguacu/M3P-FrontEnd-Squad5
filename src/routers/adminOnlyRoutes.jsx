import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export const AdminOnly = ({ children }) => {
  const { token, isAdmin } = useAuth();
  if (!token || isAdmin == "N") {
    toast.error("Acesso somente para administradores");
    return <Navigate to="/" />;
  }
  return children;
};
