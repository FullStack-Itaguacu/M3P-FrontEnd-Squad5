import { useNavigate } from "react-router-dom";
import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { toast } from "react-toastify";
import { FormStyleLogin } from "./styled";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Anchor,
  Stack,
  Image,
  Checkbox,
} from "@mantine/core";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const FormLogin = () => {
  const [type] = useToggle(["entrar", "registrar"]);
  const navigate = useNavigate();
  const { token, setToken, userId, typeUser } = useContext(AuthContext);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      administrador: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Email inválido"),
      password: (val) =>
        /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,30}$/.test(val)
          ? null
          : "A senha precisa ter pelo menos 8 caracteres, 1 letra e 1 número",
    },
  });

  const validarUsuario = async (values) => {
    const { email, password, administrador } = { ...values };
    let url = "";

    if (administrador) {
      url = "http://localhost:3333/api/user/admin/login";
    } else {
      url = "http://localhost:3333/api/user/login";
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        const responseToken = await response.json();
        const { token } = responseToken;
        setToken(token);
        if (administrador) {
          navigate("/dashboard")
        } else {
          navigate("/Products")
        }
      } else {
        const responseData = await response.json();
        if (responseData && responseData.error) {
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
      <FormStyleLogin>
        <Group>
          <Image
            src="LogoAppharma.png"
            width={200}
            height={200}
            alt="Medicamento"
            mx="auto"
            radius="md"
          />
        </Group>
        <Paper radius="md" p="xl" withBorder>
          <Text size="lg" weight={500}>
            Entrar com email e senha <br />
          </Text>
          <form
            onSubmit={form.onSubmit((values) => {
              validarUsuario(values);
            })}
          >
            <Stack>
              <TextInput
                required
                label="Email"
                placeholder="Ex: joao@email.com"
                value={form.values.email}
                onChange={(event) =>
                  form.setFieldValue("email", event.currentTarget.value)
                }
                error={form.errors.email && "Email inválido"}
                radius="md"
              />

              <PasswordInput
                required
                label="Senha"
                placeholder="Sua senha"
                value={form.values.password}
                onChange={(event) =>
                  form.setFieldValue("password", event.currentTarget.value)
                }
                error={
                  form.errors.password &&
                  "A senha precisa ter pelo menos 8 caracteres, 1 letra e 1 número"
                }
                radius="md"
              />
              <Checkbox
                label="Administrador"
                value={form.values.administrador}
                onChange={(event) =>
                  form.setFieldValue(
                    "administrador",
                    event.currentTarget.checked
                  )
                }
              />
            </Stack>

            <Group position="apart" mt="xl">
              <Anchor
                component="button"
                type="button"
                color="dimmed"
                onClick={() => navigate("/CreateUser")}
                size="xs"
              >
                {type === "registrar"
                  ? "Já possui uma conta? Entrar"
                  : "Não tem uma senha? Cadastre agora"}
              </Anchor>
              <Button type="submit" radius="xl">
                {upperFirst(type)}
              </Button>
            </Group>
          </form>
        </Paper>
      </FormStyleLogin>
    </Group>
  );
};

export default FormLogin;
