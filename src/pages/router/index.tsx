import { createBrowserRouter } from "react-router-dom";
import Providers from "../../../Providers";
import ErrorPage from "../error";
import NotFoundPage from "../error/NotFoundPage";
import Home from "../home";
import NavigateToHomeRoute from "./NavigateToHomeRoute";
import SignInPage from "../auth/LoginPage";
import SignUpPage from "../auth/SignUpPage";
import AuthProtectedRoute from "./AuthProtectedRoute";
import TaskList from "../../components/TaskList";
import Dashboard from "../dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Providers />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/",
        element: <NavigateToHomeRoute />,
        children: [
          {
            path: "/auth/sign-in",
            element: <SignInPage />,
          },
        ],
      },
      {
        path: "/",
        element: <NavigateToHomeRoute />,
        children: [
          {
            path: "/auth/sign-up",
            element: <SignUpPage />,
          },
        ],
      },

      // Protected routes
      {
        path: "/",
        element: <AuthProtectedRoute />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
        ],
      },
      {
        path: "/",
        element: <AuthProtectedRoute />,
        children: [
          {
            path: "/tasks",
            element: <TaskList />,
          },
        ],
      },

      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
