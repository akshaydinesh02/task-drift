import { Outlet } from "react-router-dom";
import AuthProvider from "./src/contexts/Auth";
import Header from "./src/components/Header";
import TasksProvider from "./src/contexts/Tasks";

const Providers = () => {
  return (
    <AuthProvider>
      <TasksProvider>
        <Header />
        <Outlet />
      </TasksProvider>
    </AuthProvider>
  );
};

export default Providers;
