import { useContext, useEffect, useState } from "react";
import caixaMedicamento from "../../assets/caixa-remedio.png";
import { Card, Image, Text, Button, Input, NumberInput } from "@mantine/core";
import { CartContext } from "../../context/CartContext";

function CardMedicamento({ medicamento }) {
  const [quantidade, setQuantidade] = useState(0);
  const { cartItems, addToCart } = useContext(CartContext);
  function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }
  if (medicamento.totalStock > 0) {
    return (
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
      >
        <Image
          src={
            isImage(medicamento.imageLink)
              ? medicamento.imageLink
              : caixaMedicamento
          }
          alt="Caixa de medicamento"
          w={150}
        />

        <Text fw={700} size="xl">
          {medicamento.name} {medicamento.dosage} {medicamento.unitDosage}
        </Text>
        <Text>{medicamento.labName}</Text>
        <Text>
          <b>Preço: </b>R$ {medicamento.unitPrice}
        </Text>
        <Text truncate shadow="sm" padding="lg" radius="md" c="dimmed">
          {medicamento.description}
        </Text>
        <Input.Wrapper label="Quantidade">
          <NumberInput
            value={quantidade}
            min={1}
            max={medicamento.totalStock}
            onChange={(e) => setQuantidade(e)}
          />
        </Input.Wrapper>
        <Button
          onClick={() => addToCart(medicamento, quantidade)}
          variant="light"
          color="blue"
          fullWidth
          mt="md"
          radius="md"
        >
          Adicionar ao carrinho
        </Button>
      </Card>
    );
  }
}

export default CardMedicamento;
