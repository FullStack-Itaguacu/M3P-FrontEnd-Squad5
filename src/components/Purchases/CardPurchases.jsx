import { Card, Text, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import ModalContent from "./ModalContent";
import axios from "axios";
import { Container } from "react-bootstrap";

function CardPurchases({ vendas }) {
  const [opened, handlers] = useDisclosure(false);
  const [products, setProducts] = useState([]);

  const soma = (vendas) => {
    let soma = 0;
    for (const venda of vendas.vendas) {
      soma += parseFloat(venda.total);
    }
    return soma;
  };

  useEffect(() => {
    for (const venda of vendas.vendas) {
      axios
        .get(`http://localhost:3333/api/products/${venda.productId}`)
        .then((response) => {
          setProducts((products) => [...products, response.data]);
        });
    }
  }, []);

  return (
    <Container>
      <Modal
        opened={opened}
        onClose={handlers.close}
        title="Medicamentos comprados"
      >
        <ModalContent produtos={products} />
      </Modal>
      <Card
        width={200}
        height={400}
        shadow="sm"
        padding="md"
        radius="md"
        withBorder
        mt={80}
        ml={20}
        mr={20}
        onClick={handlers.open}
      >
        <Text>Data da compra: {vendas.date} </Text>
        <Text>Total: R$ {soma(vendas)}</Text>
        <Text>Clique para ver lista de medicamentos comprados</Text>
      </Card>
    </Container>
  );
}

export default CardPurchases;
