import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Container, List, Title } from "@mantine/core";
import SalesCard from "./SalesCard";
import "./Sales.css";

function Sales() {
  const [vendas, setVendas] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`http://localhost:3333/api/sales/admin`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setVendas(response.data);
        });
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Title order={1} mt="lg" ta="center">
        Vendas realizadas
      </Title>
      <div className="grid">
        {vendas.map((venda) => {
          return <SalesCard venda={venda} key={venda.id} />;
        })}
      </div>
    </Container>
  );
}

export default Sales;
