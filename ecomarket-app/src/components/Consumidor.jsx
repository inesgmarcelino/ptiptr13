import React from 'react'
import {Link } from "react-router-dom";

function Consumidor () {

    return(
        <div>
            <div className="container">
                <Link to ='/profile' ><button>Voltar</button></Link>
                <br />
                <h3>As minhas encomendas</h3>     
                <h4>Morada de entrega: </h4> {/* Aqui ir buscar a morada do consumidor */}
                <button>ALTERAR</button> {/* Vai servir para alterarmos a nossa morada, se quisermos ter esta opção aqui */}
            </div>
            <br />
            <div className="container">
            <table className="table table-bordered" style={{ textAlign:"center"}}>
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Aqui colocar um for que tem tantas linhas como as encomendas do Consumidor e o conteúdo das encomendas */}
                    <tr>
                        <td>1234</td>
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

