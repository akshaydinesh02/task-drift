import { createBrowserRouter } from "react-router-dom";
import Providers from "../../../Providers";
import ErrorPage from "../error";
import NotFoundPage from "../error/NotFoundPage";
import Home from "../home";
import NavigateToDashboardRoute from "./NavigateToDashboardRoute";
import SignInPage from "../auth/LoginPage";
import SignUpPage from "../auth/SignUpPage";
import AuthProtectedRoute from "./AuthProtectedRoute";
import Dashboard from "../dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Providers />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <NavigateToDashboardRoute />,
        errorElement: <ErrorPage />,
        children: [{ path: "/", element: <Home /> }],
      },
      {
        path: "/auth/sign-in",
        element: <NavigateToDashboardRoute />,
        errorElement: <ErrorPage />,
        children: [{ path: "/auth/sign-in", element: <SignInPage /> }],
      },
      {
        path: "/auth/sign-up",
        element: <NavigateToDashboardRoute />,
        errorElement: <ErrorPage />,
        children: [{ path: "/auth/sign-up", element: <SignUpPage /> }],
      },
      {
        path: "/dashboard",
        element: <AuthProtectedRoute />,
        errorElement: <ErrorPage />,
        children: [{ path: "/dashboard", element: <Dashboard /> }],
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
