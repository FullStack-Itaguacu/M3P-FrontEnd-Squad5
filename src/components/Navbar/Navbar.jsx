import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../Navbar/Navbar.css";
import Button from "../Button/Button";
import { useAuth } from "../../context/AuthContext";
import { Badge } from "@mantine/core";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../../context/CartContext";

function Navbar() {
  const [totalItems, setTotalItems] = useState(0);
  const { token, setToken } = useAuth();
  const { cartItems } = useContext(CartContext);

  useEffect(() => {
    setTotalItems(cartItems.length);
  }, [cartItems]);

  const handleLogout = () => {
    setToken("");
    return <Navigate to="/" />;
  };

  return (
    <div>
      {!token ? (
        <nav>
          <Link to="/login">Login</Link>
        </nav>
      ) : (
        <nav>
          <Badge
            styles={{ root: { cursor: "pointer" } }}
            size="xl"
            component={Link}
            to="/carrinho-de-compras"
            leftSection={<FaShoppingCart color="black" />}
          >
            {totalItems}
          </Badge>
          <Button text="Sair" onClick={handleLogout} />
        </nav>
      )}
    </div>
  );
}

export default Navbar;
