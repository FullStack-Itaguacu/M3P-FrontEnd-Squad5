import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Container, List, Title, Flex, Button, Text } from "@mantine/core";
import { useAuth } from "../../context/AuthContext";
import CardSales from "./CardPurchases";

function Purchases() {
  const { token } = useAuth();
  const [vendas, setVendas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      axios
        .get(`http://localhost:3333/api/sales`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setVendas(response.data);
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  const groups = {};
  vendas.forEach((venda) => {
    const data = venda.createdAt.split("T")[0];
    if (groups[data]) {
      groups[data].push(venda);
    } else {
      groups[data] = [venda];
    }
  });

  const groupArrays = Object.keys(groups).map((date) => {
    return {
      date,
      vendas: groups[date],
    };
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Title order={1} mt="lg" ta="center">
        Lista de compras
      </Title>
      <List>
        {groupArrays.map((data) => {
          return <CardSales vendas={data} key={data.date} />;
        })}
      </List>
    </Container>
  );
}

export default Purchases;
