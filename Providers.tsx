import { Outlet } from "react-router-dom";
import AuthProvider from "./src/contexts/Auth";
import Header from "./src/components/Header";

const Providers = () => {
  return (
    <AuthProvider>
      <Header />
      <Outlet />
    </AuthProvider>
  );
};

export default Providers;
