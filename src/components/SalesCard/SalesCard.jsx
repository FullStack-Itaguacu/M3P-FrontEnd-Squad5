import React from "react";
import '../SalesCard/SelesCard.css'

function SalesCard({ date, total, onClick }) {
    return(
        <div className="SalesCard" onClick={onClick}>
            <div>
                <h3>Data da compra: {date}</h3>
                <h4>Total: {total}</h4>
            </div>
            <div className="details">
                Clique para ver detalhes:
            </div>
        </div>

    )
}

export default SalesCard