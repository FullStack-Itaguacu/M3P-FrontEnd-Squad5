import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import InformacoesDetalhadasUser from "../Modal/InformacoesDetalhadasUser";
import { useNavigate } from "react-router-dom";

const CardUser = ({ user }) => {
  const navigate = useNavigate();

  function editarUser(user) {
    navigate("/editUser", { state: user });
  }

  return (
    <Card
      width={400}
      height={400}
      shadow="sm"
      padding="xl"
      radius="md"
      withBorder
      mt={80}
      ml={20}
      mr={20}
    >
      <Card.Section onClick={() => editarUser(user)}>
        <Image
          src="src\imagens\user.jpg"
          width={300}
          height={300}
          alt="Usuário"
          mx="auto"
          radius="md"
        />
      </Card.Section>
      <Group position="apart" mt="md" mb="xs">
        <Text weight={300}>{user.fullName}</Text>
        <Badge color="pink" variant="light">
          {user.cpf}
        </Badge>
      </Group>

      <Text truncate shadow="sm" padding="lg" radius="md" color="dimmed">
        {user.email}
      </Text>

      <Badge color="blue" variant="light">
        {user.typeUser}
      </Badge>

      <InformacoesDetalhadasUser user={user} />
    </Card>
  );
};

export default CardUser;
