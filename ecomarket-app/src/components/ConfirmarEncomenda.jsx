import React from 'react'
import {Link } from "react-router-dom";
import {useState} from 'react';




function ConfirmarEncomenda () {

    

    const App = () => {
    
        const [buttonText, setButtonText] = useState('Confirmar');
        
        function Confirmada(){
            setButtonText('Confirmada');
        }

        return (
            <div>
                <button type="button" class="btn btn-success">{buttonText}</button>
            </div>
        );
    }

    return(
        <div>
            <div className="container">
                <Link to ='/profile' ><button>Voltar</button></Link>
                <br />
                <h3>Confirmando Encomenda</h3>     
            </div>
            <br />
            <div className="container">
            <table className="table table-bordered" style={{ textAlign:"center"}}>
                <thead>
                    <tr>
                        <th>Transportador</th>
                        <th>Dia e Hora de Entrega</th>
                        <th>Preço do Transporte</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* Aqui colocar um for que tem tantas linhas como o nuemro de transportadoras para esta encomenda */}
                    <tr>
                        <td>Transportador 1</td>
                        <td>10-mar 09h00</td>
                        <td>1&euro</td>
                        <div class="d-flex justify-content-center"> 
                            {/* Aqui caso o botão seja selecionado deve avisar ao utilizador que a encomenda foi concluida e deve retornar à pagina das encomendas do Fornecedor */}
                            <td><Link to ='/fornecedor'> <button type="button" class="btn btn-success" onClick={Confirmada}>CONFIRME</button></Link></td>
                        </div>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    )


}

export default ConfirmarEncomenda;