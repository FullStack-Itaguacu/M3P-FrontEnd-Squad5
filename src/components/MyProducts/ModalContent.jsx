import { Box, Button, Group, NumberInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

function ModalContent({ produto }) {
  const form = useForm({
    initialValues: {
      name: produto.name,
      imageLink: produto.imageLink,
      dosage: produto.dosage,
      totalStock: produto.totalStock,
    },

    validate: {
      name: (value) =>
        value.length < 1 ? "Campo não deve ser deixado em branco" : null,
      imageLink: (value) =>
        value.length < 1 ? "Campo não deve ser deixado em branco" : null,
      dosage: (value) =>
        value.length < 1 ? "Campo não deve ser deixado em branco" : null,
      totalStock: (value) =>
        value < 0 ? "Estoque não pode ser negativo" : null,
    },
  });

  const alterarProduto = async (values) => {
    const { name, imageLink, dosage, totalStock } = { ...values };
    axios
      .patch(`http://localhost:3333/api/products/admin/${produto.id}`, {
        name,
        imageLink,
        dosage,
        totalStock,
      })
      .then((response) => {
        if (response.status == 204) {
          toast.success("Alteração realizada com sucesso");
          window.location.reload(false);
        }
      })
      .catch((error) => {
        toast.error("Erro no servidor. Contate o administrador do sistema!");
        console.log(error);
      });
  };
  return (
    <Box maw={400} mx="auto">
      <form onSubmit={form.onSubmit((values) => alterarProduto(values))}>
        <TextInput label="Medicamento" {...form.getInputProps("name")} />
        <TextInput
          label="Link da imagem"
          {...form.getInputProps("imageLink")}
        />
        <TextInput label="Dosage" {...form.getInputProps("dosage")} />
        <NumberInput label="Estoque" {...form.getInputProps("totalStock")} />
        <Group justify="flex-end" mt="md">
          <Button type="submit">Enviar modificações</Button>
        </Group>
      </form>
    </Box>
  );
}

export default ModalContent;
