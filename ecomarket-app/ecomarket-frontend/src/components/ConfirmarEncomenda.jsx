import React from 'react'
import {Link } from "react-router-dom";

/* Função para tentar mudar o estado do Butão do Fornecedor de Confirmar para Confirmado */ 

/* function App () {
    
    const [buttonText, setButtonText] = useState('Confirmar');
    
    function Confirmada(){
        setButtonText('Confirmada');
    }

    return (
        <div>
            <button type="button" class="btn btn-success">{buttonText}</button>
        </div>
    );
} */


function ConfirmarEncomenda () {

    

    return(
        <div className="position-absolute showItems">
            <div className="container">
                <Link to ='/profile' ><button type="button" className="btn btn2" >Voltar</button></Link>
                <br />
                <h3>Confirmar Encomenda</h3>     
            </div>
            <br />
            <div className="container">
            <table className="table table-bordered" id='centrar'>
                <thead>
                    <tr>
                        <th>Transportador</th>
                        <th>Dia e Hora de Entrega</th>
                        <th>Preço do Transporte</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* Aqui colocar um for que tem tantas linhas como o numero de transportadoras para esta encomenda */}
                    <tr>
                        <td>Transportador 1</td>
                        <td>10-mar 09h00</td>
                        <td>1&euro;</td>
                        <div class="d-flex justify-content-center"> 
                            {/* Aqui caso o botão seja selecionado deve avisar ao utilizador que a encomenda foi concluida e deve retornar à pagina das encomendas do Fornecedor */}
                            <td><Link to ='/fornecedor'> <button type="button" class="btn btn-success">CONFIRME</button></Link></td>
                        </div>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    )


}

export default ConfirmarEncomenda;