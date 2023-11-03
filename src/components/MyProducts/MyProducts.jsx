import { Input, Title, Container } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import "../Products/MedicamentsList.css";
import CardProduct from "./CardProduct";
import { useAuth } from "../../context/AuthContext";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const [barraPesquisa, setBarraPesquisa] = useState([]);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [filter, setFilter] = useState([]);
  const [next, setNext] = useState(false);
  const [previous, setPrevious] = useState(false);
  const { token } = useAuth();

  const setPreviousPage = () => {
    setOffset(offset - limit);
  };

  const setNextPage = () => {
    setOffset(offset + limit);
  };

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`http://localhost:3333/api/products/admin/${offset}/${limit}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          if (response.data) {
            setProducts(response.data);
          }
        });
    };
    fetchData();
  }, [limit, offset]);

  useEffect(() => {
    if (products) {
      if (products.length / limit == 1) {
        setNext(true);
      }
      if (offset > 0) setPrevious(true);
    }
  }, [products, limit, offset]);

  useEffect(() => {
    setFilter(
      products.filter((el) => {
        if (barraPesquisa === "") return el;
        return el.name.toLowerCase().includes(barraPesquisa);
      })
    );
  }, [barraPesquisa, products]);

  return (
    <Container>
      <Title order={1} mt="lg" ta="center">
        Lista de medicamentos
      </Title>
      <Input.Wrapper label="Busca">
        <Input
          placeholder="Digite o nome do medicamento"
          onChange={(e) => setBarraPesquisa(e.target.value.toLowerCase())}
          value={barraPesquisa}
        />
      </Input.Wrapper>
      <Input.Wrapper label="Medicamentos por página">
        <Input component="select" onChange={(e) => setLimit(e.target.value)}>
          <option value="20">20</option>
          <option value="40">40</option>
          <option value="60">60</option>
          <option value="80">80</option>
        </Input>
      </Input.Wrapper>
      <div>
        {previous && (
          <button type="button" onClick={setPreviousPage}>
            Página anterior
          </button>
        )}
        {next && (
          <button type="button" onClick={setNextPage}>
            Próxima página
          </button>
        )}
      </div>
      <div className="grid">
        {filter.map((medicamento) => (
          <CardProduct produto={medicamento} key={medicamento.id} />
        ))}
      </div>
    </Container>
  );
}

export default MyProducts;
