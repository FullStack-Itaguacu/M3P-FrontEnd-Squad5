import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Container, Radio, Title, Flex, Button, Text } from "@mantine/core";

function Checkout() {
  const [addresses, setAddresses] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      axios.get(`http://localhost:3333/api/buyers/address`).then((response) => {
        setAddresses(response.data);
        setLoading(false);
      });
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Text size={"xl"}>Selecione o endereço de entrega</Text>
      {addresses.map((address) => {
        <li>{address}</li>;
      })}
    </Container>
  );
}

export default Checkout;
