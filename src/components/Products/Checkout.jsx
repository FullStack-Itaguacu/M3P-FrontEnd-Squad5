import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Container, Radio, Select, Flex, Button, Text } from "@mantine/core";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [pagamento, setPagamento] = useState("");
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      axios.get(`http://localhost:3333/api/buyers/address`).then((response) => {
        setAddresses(response.data);
        setLoading(false);
      });
    };
    fetchData();
  }, []);

  const confirmarCompra = async () => {
    if (!addresses) return toast.error("Sem endereço cadastrado");
    if (!selectedAddress) return toast.error("Selecione um endereço");
    if (!pagamento) return toast.error("Selecione um meio de pagamento");
    const compra = cartItems.map((item) => {
      return {
        productId: item.id,
        amountBuy: item.quantity_cart,
        usersAddressesId: selectedAddress.users_address.id,
        typePayment: pagamento,
      };
    });
    try {
      console.log(compra);
      const response = await axios.post(
        "http://localhost:3333/api/sales/",
        compra
      );
      console.log(response);
      toast.success(response.data.message);
      clearCart();
      return navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Text size={"xl"}>Selecione o endereço de entrega</Text>
      {addresses.map((address) => {
        return (
          <Radio
            key={address.id}
            value={address.id}
            size="md"
            label={`
              ${address.street}, 
              ${address.numberStreet},
              ${address.neighborhood},
              ${address.city},
              ${address.state}`}
            onChange={() => setSelectedAddress(address)}
          />
        );
      })}
      <Text size={"xl"}>Selecione a forma de pagamento</Text>
      <Select
        data={["credito", "debito", "pix", "boleto", "transferencia"]}
        value={pagamento}
        onChange={setPagamento}
      />
      <Button onClick={confirmarCompra}>Confirmar compra</Button>
    </Container>
  );
}

export default Checkout;
