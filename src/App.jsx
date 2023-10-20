import { Outlet } from 'react-router-dom';
import { createContext } from 'react';

export const AppContext = createContext();

export const App = () => {

  // // Inserir abaixo funções e variáveis utilizadas por todo o Appharma
  const valoresVF = {};

  return (
    <AppContext.Provider value={valoresVF}>
        <div>
          <Outlet />
        </div>
    </AppContext.Provider>
  );
};
