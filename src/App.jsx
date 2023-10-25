import { Outlet } from "react-router-dom";
import { createContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "./components/SideBar/SideBar";
import { CartProvider } from "./context/CartContext";

export const AppContext = createContext();

export const App = () => {
  // // Inserir abaixo funções e variáveis utilizadas por todo o Appharma
  const valoresVF = {};

  return (
    <>
      <AppContext.Provider value={valoresVF}>
        <CartProvider>
          <div>
            <SideBar />
            <Outlet />
          </div>
        </CartProvider>
      </AppContext.Provider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};
