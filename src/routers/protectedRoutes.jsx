import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  if (!token) {
    toast.error("Acesso somente para usuários cadastrados");
    return <Navigate to="/" />;
  }
  return children;
};
