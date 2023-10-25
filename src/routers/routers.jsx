import { createBrowserRouter } from 'react-router-dom';
import { App } from '../App';

import { ProductsPage } from '../pages/Products';
import { SignUpPage } from '../pages/SignUp'
import { LoginPage } from '../pages/User/UserLogin'
import { ErrorPage } from '../pages/ErrorPage';
import { CreateUserPage } from '../pages/User/UserCreate'

export const routers = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/createUser',
        element: <CreateUserPage />,
      },
      {
        path: '/products',
        element: <ProductsPage />,
      },
      {
        path: '/singup',
        element: <SignUpPage />,
      },
    ],
  },
]);