import { useContext, useEffect, useState } from "react";
import { Title, Input, Pagination } from "@mantine/core";
import "./MedicamentsList.css";
// import { useNavigate } from "react-router-dom";
import CardMedicamento from "./CardMedicamento";
// import { LoginContext } from "../context/LoginContext";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

function MedicamentsList() {
  const [listaMedicamentos, setListaMedicamentos] = useState([]);
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
        .get(`http://localhost:3333/api/products/${offset}/${limit}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          if (response.data.data) {
            setListaMedicamentos(response.data.data);
          }
        });
    };
    fetchData();
  }, [limit, offset]);

  useEffect(() => {
    if (listaMedicamentos) {
      if (listaMedicamentos.length / limit == 1) {
        setNext(true);
      }
      if (offset > 0) setPrevious(true);
    }
  }, [listaMedicamentos, limit, offset]);

  useEffect(() => {
    setFilter(
      listaMedicamentos.filter((el) => {
        if (barraPesquisa === "") return el;
        return el.name.toLowerCase().includes(barraPesquisa);
      })
    );
  }, [barraPesquisa, listaMedicamentos]);

  return (
    <div>
      <div className="container">
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
            <CardMedicamento medicamento={medicamento} key={medicamento.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MedicamentsList;
