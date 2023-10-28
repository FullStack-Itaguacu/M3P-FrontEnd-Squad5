import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { Container, Stack, Title, Flex, Button, Text } from "@mantine/core";
import caixaMedicamento from "../../assets/caixa-remedio.png";

function Cart() {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } =
    useContext(CartContext);
  const [showAddresses, setShowAddresses] = useState(false);
  function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }

  return (
    <Container>
      <Title order={1} mt="lg" ta="center">
        Carrinho
      </Title>
      <Stack bg="#DCE4F5" mt="md" mb="md" p="sm">
        {cartItems.map((item) => (
          <Flex direction="col" justify="space-between" key={item.id}>
            <Flex>
              <img
                src={
                  isImage(item.imageLink) ? item.imageLink : caixaMedicamento
                }
                alt={item.title}
                className="rounded-md h-24"
                height={100}
              />
              <div className="flex flex-col">
                <h2 className="text-lg font-bold">
                  {item.name} {item.dosage} {item.unitDosage}
                </h2>
                <p className="text-gray-600">R$ {item.unitPrice}</p>
              </div>
            </Flex>
            <Flex align="center">
              <Button
                onClick={() => {
                  addToCart(item, 1);
                }}
              >
                <Text ta="center">+</Text>
              </Button>
              <Text size="xl" m="sm">
                {item.quantity_cart}
              </Text>
              <Button
                onClick={() => {
                  if (item.quantity_cart == 1) removeFromCart(item);
                  else addToCart(item, -1);
                }}
              >
                <b>-</b>
              </Button>
            </Flex>
          </Flex>
        ))}
      </Stack>
      {cartItems.length > 0 ? (
        <Container>
          <Flex bg="#DCE4F5" mt="md" mb="md" p="sm" justify="space-between">
            <h2 className="text-lg font-bold">Total: R$ {getCartTotal()}</h2>
            <Button
              onClick={() => {
                clearCart();
              }}
            >
              Limpar carrinho
            </Button>
          </Flex>
          <Button size="xl" onClick={() => setShowAddresses(true)}>
            Finalizar compra
          </Button>
        </Container>
      ) : (
        <h1 className="text-lg font-bold">Seu carrinho está vazio</h1>
      )}
      {showAddresses ? "Endereços" : null}
    </Container>
  );
}

export default Cart;
