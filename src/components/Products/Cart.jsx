import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

function Cart() {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } =
    useContext(CartContext);

  return <div></div>;
}

export default Cart;
