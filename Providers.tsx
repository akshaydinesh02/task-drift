import { Outlet } from "react-router-dom";
import AuthProvider from "./src/contexts/Auth";
import Header from "./src/components/Header";
import TasksProvider from "./src/contexts/Data";
import ToggleContextProvider from "./src/contexts/Toggle";

const Providers = () => {
  return (
    <AuthProvider>
      <ToggleContextProvider>
        <TasksProvider>
          <Header />
          <Outlet />
        </TasksProvider>
      </ToggleContextProvider>
    </AuthProvider>
  );
};

export default Providers;
