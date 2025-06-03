import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { jwtDecode } from "jwt-decode";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token, logout } = useAuthStore();

  if (!token) return <Navigate to="/login" replace />;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp! < currentTime) {
      logout();
      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    logout();
    return <Navigate to="/login" replace />;
  }
  return children;
};
