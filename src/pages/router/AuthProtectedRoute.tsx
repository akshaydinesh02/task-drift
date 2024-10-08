import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";

const AuthProtectedRoute = () => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/auth/sign-in" replace />;
  }
  return <Outlet />;
};

export default AuthProtectedRoute;
