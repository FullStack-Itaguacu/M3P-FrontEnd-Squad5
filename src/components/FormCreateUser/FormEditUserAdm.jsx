import { useForm } from "@mantine/form";
import { IMaskInput } from "react-imask";
import { toast } from "react-toastify";
import { FormStyleCreateUser } from "./styled";
import "dayjs/locale/pt-br";
import ValidarCPF from "../utils/ValidarCPF";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { redirect } from "react-router-dom";

import {
  TextInput,
  Text,
  Paper,
  Group,
  Button,
  Stack,
  Grid,
  Select,
} from "@mantine/core";

const FormEditUserAdm = () => {
  const location = useLocation();
  const { token } = useAuth();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      id: "",
      email: "",
      cpf: "",
      fullName: "",
      phone: "",
      typeUser: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Email inválido"),
      cpf: (val) => (ValidarCPF(val) ? null : "CPF Inválido"),
    },
    transformValues: (values) => {
      return {
        ...values,
        cpf: values.cpf.match(/\d/g).join(""),
        phone: values.phone.match(/\d/g).join(""),
      };
    },
  });

  useEffect(() => {
    if (location.state) {
      form.setFieldValue("id", location.state.id);
      form.setFieldValue("fullName", location.state.fullName);
      form.setFieldValue("cpf", location.state.cpf);
      form.setFieldValue("email", location.state.email);
      form.setFieldValue("phone", location.state.phone);
      form.setFieldValue("typeUser", location.state.typeUser);
    } else {
      form.reset();
    }
  }, [location]);

  const editarUsuario = async (values) => {
    console.log(values);
    const { id, cpf, email, fullName, phone, typeUser } = { ...values };

    const user = {
      fullName: fullName,
      email: email,
      cpf: cpf,
      phone: phone,
      typeUser: typeUser,
    };
    console.log(user);

    try {
      const response = await fetch(
        `http://localhost:3333/api/buyers/admin/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(user),
        }
      );
      console.log(response.status);
      if (response.status == 204) {
        form.reset();
        toast.success("Usuário atualizado com sucesso");
        return navigate("/listUsers");
      } else {
        const responseData = await response.json();
        if (responseData && (responseData.error || responseData.msg)) {
          toast.info(responseData.error);
        } else {
          toast.error("Erro no servidor. Contate o administrador do sistema!");
        }
      }
    } catch (error) {
      toast.error("Erro no servidor. Contate o administrador do sistema!");
    }
  };

  return (
    <Group position="center">
      <FormStyleCreateUser>
        <Paper radius="md" p="xl" withBorder>
          <Text size="lg" weight={500}>
            Editar usuário
            <br />
          </Text>
          <form onSubmit={form.onSubmit((values) => editarUsuario(values))}>
            <Stack>
              <Grid ml={0} mr={0}>
                <Grid.Col span={12}>
                  <TextInput
                    label="Nome Completo"
                    withAsterisk
                    placeholder="Informe o nome"
                    {...form.getInputProps("fullName")}
                    required
                    radius="md"
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <TextInput
                    label="CPF"
                    withAsterisk
                    placeholder="Informe o CPF"
                    mask="000.000.000-00"
                    component={IMaskInput}
                    required
                    {...form.getInputProps("cpf")}
                    radius="md"
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <TextInput
                    label="Telefone"
                    withAsterisk
                    placeholder="(99) 99999-9999"
                    mask="(00) 00000-0000"
                    component={IMaskInput}
                    required
                    {...form.getInputProps("phone")}
                  />
                </Grid.Col>

                <Grid.Col span={6}>
                  <Select
                    withAsterisk
                    label="Tipo Usuário"
                    placeholder="Informe o tipo de usuário"
                    required
                    data={["comprador", "administrador"]}
                    searchable
                    {...form.getInputProps("typeUser")}
                  />
                </Grid.Col>
              </Grid>
              <TextInput
                required
                label="Email"
                placeholder="Ex: joao@email.com"
                {...form.getInputProps("email")}
                error={form.errors.email && "Email inválido"}
                radius="md"
              />
            </Stack>
            <Group position="apart" mt="xl">
              <Button type="submit" radius="xl">
                Editar
              </Button>
            </Group>
          </form>
        </Paper>
      </FormStyleCreateUser>
    </Group>
  );
};

export default FormEditUserAdm;
