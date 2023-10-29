import React, { useState, useEffect } from "react"
import Navbar from "../../components/Navbar"
import SalesCard from "../../components/SalesCard/SalesCard"

function MyShopping () {
    const [sales, setSales] = useState([]);

    useEffect(() => {
        //Obter dados do endpoint.
        async function getSalesData() {
            try {
                const response = await fetch('http://localhost:3333/api/seles/')
                if(!response.ok){
                    throw new Error('Erro na resposta da API')
                }
                const data = await response.json()
                setSales(data)
            } catch (error) {
                console.error('Erro ao buscar dados de vendas:', error);
            }
        }

        getSalesData()
    }, [])

    //Agrupar vendas por data
        const groupSalesByDate = sales => {
            const groupedSales = {}
            sales.forEach(sale => {
                const date = sale.createdAt
                if(!groupedSales[date]) {
                    groupedSales[date] = []
                }
                groupedSales[date].push(sale)
            })
            return groupedSales
        }

        const groupedSales = groupSalesByDate(sales)

    return(
        <div>
            <Navbar />
            {Object.keys(groupedSales).map(date =>(
                <SalesCard key={date} date={date} total={groupedSales[date].reduce((total, sale) => total + sale.total, 0)}
                onClick={() => handleOpenModal(groupedSales[date])}/>
            ))}
        </div>
    )
}

export default MyShopping