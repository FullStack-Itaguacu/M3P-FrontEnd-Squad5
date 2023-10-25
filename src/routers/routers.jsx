import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";

import { ProductsPage } from "../pages/Products";
import { SignUpPage } from "../pages/SignUp";
import { LoginPage } from "../pages/UserLogin";
import { ErrorPage } from "../pages/ErrorPage";
import ListaMedicamentos from "../pages/ListaMedicamentos";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/products",
        element: <ListaMedicamentos />,
      },
      {
        path: "/singup",
        element: <SignUpPage />,
      },
    ],
  },
]);
