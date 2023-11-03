import { Grid, Button, Group, Table} from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from 'react-toastify';
import { useForm } from '@mantine/form';
import { Container } from "./styled";
import CardUser from "../../components/CardUser/CardUser";

const ListUser = () => {
  const navigate = useNavigate();
  const { token } = useAuth()
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);

  const setPreviousPage = () => {
    setOffset(offset - limit);
  };

  const setNextPage = () => {
    setOffset(offset + limit);
  };


useEffect(() => {
      fetch(`http://localhost:3333/api/buyers/admin/${offset}/${limit}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      }).then((resposta) => {
        return resposta.json();
      }).then((dados) => {setListaUsuarios(dados.users)})
  }, []);

  return (
    <Container>
       <Group position="right" mr={40}>
       <Button ml={10} mt={30} color="blue" onClick={() => navigate("/createUserAdm")}> Novo Usuário</Button>
       </Group>
       <Grid>
       {listaUsuarios && listaUsuarios.map((user) => {      
          return(
          <Grid.Col span={3}>
          <CardUser user={user} />
          </Grid.Col>)
        })}

       </Grid>
    </Container>
  );
};

export default ListUser;