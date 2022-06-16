import React from 'react'
import {Link } from "react-router-dom";

function Consumidor () {

    return(
        <div className="position-absolute showItems">
            <div className="container">
                <Link to ='/profile' ><button type="button" className="btn">Voltar</button></Link>
                <br />
                <h3>As minhas encomendas</h3>     
                
            </div>
            <br />
            <div className="container">
            <table className="table table-bordered" id='centrar'>
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Morada de Entrega</th>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Aqui colocar um for que tem tantas linhas como as encomendas do Consumidor e o conteúdo das encomendas */}
                    <tr>
                        <td>1234</td>
                        <td>Rua das Flores</td>
                        <td>Cereais</td>
                        <td>2</td>
                        <td>Em trânsito</td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    )


}

export default Consumidor;

