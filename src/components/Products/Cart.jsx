import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Container, Stack, Title } from "@mantine/core";
import caixaMedicamento from "../../assets/caixa-remedio.png";

function Cart() {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } =
    useContext(CartContext);
  function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }

  return (
    <Container>
      <Title order={1} mt="lg" ta="center">
        Carrinho
      </Title>
      <Stack>
        {cartItems.map((item) => (
          <div className="flex justify-between items-center" key={item.id}>
            <div className="flex gap-4">
              <img
                src={
                  isImage(item.imageLink) ? item.imageLink : caixaMedicamento
                }
                alt={item.title}
                className="rounded-md h-24"
                height={100}
              />
              <div className="flex flex-col">
                <h1 className="text-lg font-bold">
                  {item.name} {item.dosage} {item.unitDosage}
                </h1>
                <p className="text-gray-600">R$ {item.unitPrice}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                onClick={() => {
                  addToCart(item, 1);
                }}
              >
                +
              </button>
              <p>{item.quantity_cart}</p>
              <button
                className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                onClick={() => {
                  removeFromCart(item);
                }}
              >
                -
              </button>
            </div>
          </div>
        ))}
      </Stack>
      {cartItems.length > 0 ? (
        <div className="flex flex-col justify-between items-center">
          <h1 className="text-lg font-bold">Total: ${getCartTotal()}</h1>
          <button
            className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            onClick={() => {
              clearCart();
            }}
          >
            Clear cart
          </button>
        </div>
      ) : (
        <h1 className="text-lg font-bold">Your cart is empty</h1>
      )}
    </Container>
  );
}

export default Cart;
