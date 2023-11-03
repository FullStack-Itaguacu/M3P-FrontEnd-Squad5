import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import Products from "../pages/Products/Products";
import Cart from "../pages/Products/Cart";
import { SignUpPage } from "../pages/SignUp";
import { LoginPage } from "../pages/User/UserLogin";
import { ErrorPage } from "../pages/ErrorPage";
import { CreateUserAdmPage } from "../pages/User/UserCreateAdm";
import { ListUserPage } from "../pages/User/UsersList";
import { CreateProductPage } from "../pages/Products/ProductCreate"
import { CreateUserPage } from "../pages/User/UserCreate";
import { ProtectedRoute } from "./protectedRoutes";
import { AdminOnly } from "./adminOnlyRoutes";
import CreateProducts from "../pages/Products/createProducts";
import { Support } from "../pages/Support";
import MeusProdutos from "../pages/Products/MyProducts";
import PaginaDashboard from "../pages/Dashboard/PaginaDashboard";
import PaginaSales from "../pages/Sales/Sales";
import PaginaPurchases from "../pages/Sales/Purchases";

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
        path: "/createUser",
        element: <CreateUserPage />,
      },
      {
        path: "/dashboard",
        element: (
          <AdminOnly>
            <PaginaDashboard />
          </AdminOnly>
        ),
      },
      {
        path: "/purchases",
        element: (
          <ProtectedRoute>
            <PaginaPurchases />
          </ProtectedRoute>
        ),
      },
      {
        path: "/createUserAdm",
        element: <CreateUserAdmPage />,
      },
      {
        path: "/createProduct",
        element: <CreateProductPage />,
      },
      {
        path: "/listUsers",
        element: <ListUserPage />,
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
        path: "/sales",
        element: (
          <AdminOnly>
            <PaginaSales />
          </AdminOnly>
        ),
      },
      {
        path: "/meus-produtos",
        element: (
          <AdminOnly>
            <MeusProdutos />
          </AdminOnly>
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
        path: "/create-user",
        element: <CreateProducts />,
      },
    ],
  },
]);
