import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../Navbar/Navbar.css'


function Navbar() {

    const [userName, setUserName] = useState('')

    // Adicionando o nome do usuário ao estado quando a resposta da API chegar
    useEffect(() => {
        async function getUserFullName() {
            try {
                const response = await fetch('http://localhost:3333/api/user/login/');
                const data = await response.json();
                if (data.fullName) {
                    setUserName(data.fullName);
                }
            } catch (error) {
                console.error(error);
            }
        }
        getUserFullName();
    }, []);

    // Função de logout
    const handleLogout = () => {
        localStorage.removeItem("token")
    }

    return (
        <div>
            <nav>
                <Link to="/minhas-compras">
                    Minhas Compras
                </Link>

                <Link to="/carrinho-de-compras">
                    Carrinho de Compras
                </Link>
                
                <div>
                    {userName && <p>Olá, {userName}!</p>}
                </div>

                <button onClick={handleLogout}>
                    Sair
                </button>
            </nav>
        </div>
    )
}

export default Navbar;