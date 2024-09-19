import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../../contexts/Auth";

const AuthProtectedRoute = () => {
  const session = useAuth().session;
  if (!session) {
    return <Navigate to="/auth/sign-in" />;
  }
  return <Outlet />;
};

export default AuthProtectedRoute;
