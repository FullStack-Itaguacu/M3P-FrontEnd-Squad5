import { Card, Container, Image, Text } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import caixaMedicamento from "../../assets/caixa-remedio.png";

function SalesCard({ venda }) {
  const [product, setProduct] = useState([]);
  function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3333/api/products/${venda.productId}`)
      .then((response) => {
        setProduct(response.data);
      });
  }, []);

  return (
    <Card
      width={250}
      height={400}
      shadow="sm"
      padding="md"
      radius="md"
      withBorder
      mt={80}
      ml={20}
      mr={20}
    >
      <Image
        src={isImage(product.imageLink) ? product.imageLink : caixaMedicamento}
        alt="Caixa de medicamento"
        w={150}
      />
      <Text>Data: {venda.createdAt.split("T")[0]}</Text>
      <Text fw={700} size="xl">
        {product.name} {product.dosage} {product.unitDosage}
      </Text>
      <Text>{product.labName}</Text>
      <Text>Unidades vendidas: {venda.amountBuy}</Text>
      <Text>Valor unitário: R$ {venda.total / venda.amountBuy}</Text>
      <Text>Total: R$ {venda.total}</Text>
    </Card>
  );
}

export default SalesCard;
