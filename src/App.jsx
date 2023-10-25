import { Outlet } from "react-router-dom";
import { createContext } from "react";
import SideBar from "./components/SideBar/SideBar";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

export const AppContext = createContext();

export const App = () => {
  // // Inserir abaixo funções e variáveis utilizadas por todo o Appharma
  const valoresVF = {};

  return (
    <MantineProvider>
      <AppContext.Provider value={valoresVF}>
        <div>
          <SideBar />
          <Outlet />
        </div>
      </AppContext.Provider>
    </MantineProvider>
  );
};
