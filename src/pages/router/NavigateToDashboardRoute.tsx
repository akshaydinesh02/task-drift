import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";

const NavigateToDashboardRoute = () => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};

export default NavigateToDashboardRoute;
