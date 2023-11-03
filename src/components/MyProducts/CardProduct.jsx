import { Button, Card, Image, Modal, Text } from "@mantine/core";
import caixaMedicamento from "../../assets/caixa-remedio.png";
import { useDisclosure } from "@mantine/hooks";
import ModalContent from "./ModalContent";

function CardProduct({ produto }) {
  const [opened, handlers] = useDisclosure(false);
  function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }
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
      <Modal
        opened={opened}
        onClose={handlers.close}
        title="Editar medicamento"
      >
        <ModalContent produto={produto} />
      </Modal>
      <Image
        src={isImage(produto.imageLink) ? produto.imageLink : caixaMedicamento}
        alt="Caixa de medicamento"
        w={150}
      />
      <Text fw={700} size="xl">
        {produto.name} {produto.dosage} {produto.unitDosage}
      </Text>
      <Text>{produto.labName}</Text>
      <Text>
        <b>Preço: </b>R$ {produto.unitPrice}
      </Text>
      <Text>{produto.typeProduct}</Text>
      <Text truncate shadow="sm" padding="lg" radius="md" c="dimmed">
        {produto.description}
      </Text>
      <Text>Estoque: {produto.totalStock}</Text>
      <Button onClick={handlers.open}>Editar produto</Button>
    </Card>
  );
}

export default CardProduct;
