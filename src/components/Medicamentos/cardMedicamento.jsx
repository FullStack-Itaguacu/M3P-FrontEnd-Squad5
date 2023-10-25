import { useState } from "react";
import "./cardMedicamento.css";
import caixaMedicamento from "../../assets/caixa-remedio.png";
import {
  Card,
  Image,
  Text,
  InputWrapper,
  Button,
  Input,
  NumberInput,
} from "@mantine/core";

function CardMedicamento({ medicamento }) {
  const [quantidade, setQuantidade] = useState(0);
  function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }
  console.log(medicamento);

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
      <InputWrapper label="Quantidade">
        <NumberInput
          value={quantidade}
          min={0}
          max={medicamento.totalStock}
          onChange={setQuantidade}
        />
      </InputWrapper>
      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        Comprar
      </Button>
    </Card>
  );
}

export default CardMedicamento;
