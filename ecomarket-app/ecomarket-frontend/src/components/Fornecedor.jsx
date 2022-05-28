import React from 'react'
import {Link } from "react-router-dom";


function Fornecedor () {


    return(
        <div className="position-absolute showItems">
            <div className="container">
                <Link to ='/profile' ><button className="btn">Voltar</button></Link>
                <br />
                <h3>Encomendas</h3>     
            </div>
            <br />
            <div className="container">
            <table className="table table-bordered" id='tableCon'>
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Confirmar/Confirmado</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Aqui colocar um for que tem tantas linhas como as encomendas do Fornecedor e o conteúdo das encomendas */}
                    <tr>
                        <td>9765</td>
                        <td>Coca-cola</td>
                        <td>4</td>
                        {/* Fazer aqui um if em que caso a encomenda já tenha sido confirmada o botão muda para confirmada e colocar num verde mais claro */}
                        <div class="d-flex justify-content-center"> 
                            <td><Link to ='/confirmarencomenda'> <button type="button" class="btn btn-success">CONFIRMAR</button></Link></td>
                        </div>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    )


}

export default Fornecedor;