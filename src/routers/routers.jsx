import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { UserResults } from "../pages/User/UserResults";
import Products from "../pages/Products/Products";
import Cart from "../pages/Products/Cart";
import { SignUpPage } from "../pages/SignUp";
import { LoginPage } from "../pages/User/UserLogin";
import { ErrorPage } from "../pages/ErrorPage";
import { CreateUserPage } from "../pages/User/UserCreate";
import { ProtectedRoute } from "./protectedRoutes";
import { AdminOnly } from "./adminOnlyRoutes";
import Dashboard from "../components/Dashboard/dashboard";

import CreateProducts from "../pages/Products/createProducts";
import { Support } from "../pages/Support";
import Sales from "../components/Purchases/Purchases";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/dashboard",
        element: (
          <AdminOnly>
            <Dashboard />
          </AdminOnly>
        ),
      },
      {
        path: "/createUser",
        element: <CreateUserPage />,
      },
      {
        path: "/products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "/carrinho-de-compras",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/support",
        element: <Support />,
      },
      {
        path: "/singup",
        element: <SignUpPage />,
      },

      {
        path: "/purchases",
        element: (
          <ProtectedRoute>
            <Sales />
          </ProtectedRoute>
        ),
      },
      {
        path: "/create-user",
        element: <CreateProducts />,
      },
    ],
  },
]);
