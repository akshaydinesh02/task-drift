import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../../contexts/Auth";

const NavigateToHomeRoute = () => {
  const user = useAuth().user;
  if (user) {
    return <Navigate to="/dashboard" />;
  }
  return <Outlet />;
};

export default NavigateToHomeRoute;
