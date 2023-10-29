import { createContext, useContext } from 'react';
import { useHistory } from 'react-router-dom';
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const history = useHistory();

    const handleLogout = () => {
        // Remover o token de autenticação do localStorage
        localStorage.removeItem('authToken');
        
        // Redirecionar o usuário para a página de login
        history.push('/login');
    };

    return (
        <AuthContext.Provider value={{ handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

