import { useEffect, useState } from "react";
import axios from "axios";
import {  Card, Stack, Col } from "react-bootstrap";
import styles from "./Dashboard.module.css";
import "bootstrap-icons/font/bootstrap-icons.json"

function Dashboard() {
  const [salesData, setSalesData] = useState({ totalSales: null, totalAmount: null });

  const token = localStorage.getItem("token");

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3333/api/sales/dashboard/admin`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        const { totalSales, totalAmount } = response.data.dados; 
        setSalesData({ totalSales, totalAmount });
      } catch (error) {
        console.error("Error fetching data:", error);
        setSalesData({ totalSales: 0, totalAmount: 0 });
      }
    };

    fetchData();
  }, [token]); 
  
  return (    
    <div className={`pb-5 ${styles.dashboardStyle}`}>
      <h1 className="text-center text-black pt-4">Admin Dashboard</h1>
      <p className="text-center text-black">Abaixo você pode acompanhar um resumo dos seus resultados até agora:</p>
      <Stack direction="horizontal" gap={3} className="d-flex justify-content-center">
        <Col md={2}>      
          <Card className={`p-3 ${styles.cardStyle}`}>
            <Card.Body>
              <i className="bi bi-cash-stack text-black d-flex justify-content-center p-3"></i>
              <Card.Title className="text-center text-black fs-3">Total de Vendas (R$)</Card.Title>
              <Card.Text className="text-center text-black fs-1 fw-bold">{salesData.totalSales}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={2}>
        <Card className={`p-3 ${styles.cardStyle}`}>
          <Card.Body>
            <i className="bi bi-box-seam text-black d-flex justify-content-center p-3"></i>
            <Card.Title className="text-center text-black fs-3">Produtos Vendidos</Card.Title>
            <Card.Text className="text-center text-black fs-1 fw-bold">{salesData.totalAmount}</Card.Text>
          </Card.Body>
        </Card>
        </Col>

      </Stack>
    </div>    
  );
}

export default Dashboard;
