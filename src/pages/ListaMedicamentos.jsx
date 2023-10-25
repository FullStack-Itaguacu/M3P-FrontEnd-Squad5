import { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import CardMedicamento from "../components/Medicamentos/cardMedicamento";
// import { LoginContext } from "../context/LoginContext";
import axios from "axios";

function ListaMedicamentos() {
  const [listaMedicamentos, setListaMedicamentos] = useState([]);
  const [barraPesquisa, setBarraPesquisa] = useState([]);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`http://localhost:3333/api/products/${offset}/${limit}`)
        .then((response) => {
          setListaMedicamentos(response.data.data);
        });
    };
    fetchData();
  }, [limit, offset]);

  useEffect(() => {
    console.log(listaMedicamentos);
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
        <h3>Lista de medicamentos</h3>
        <label htmlFor="barraPesquisa">
          Busca
          <input
            type="text"
            placeholder="Digite o nome do medicamento"
            value={barraPesquisa}
            onChange={(e) => setBarraPesquisa(e.target.value.toLowerCase())}
          />
        </label>
        <p>Clique no medicamento para mais detalhes</p>
        <div className="grid">
          {filter.map((medicamento) => (
            <CardMedicamento medicamento={medicamento} key={medicamento.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListaMedicamentos;
