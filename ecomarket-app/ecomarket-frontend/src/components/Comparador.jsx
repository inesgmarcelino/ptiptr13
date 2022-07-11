import React from 'react'
import {Link } from "react-router-dom";

const cereais1 = require('../images/cereaisContinente.jpg');
const cereais2 = require('../images/cereaisChocolateNegro.jpg');

function Comparador () {

    return(
        <div className="position-absolute showItems">
            <div className="container">
                <Link to ='/profile' ><button type="button" className="btn btn2" >Voltar</button></Link>
                <br />
                <h3>Comparador de Produtos</h3>     
            </div>
            <br />
            <div class="container-fluid">
            <div class="row">
                <div class="col-lg-6">
                    <div class="caixasComparador">
                    <img src={cereais1} className="card-img-top" alt="..."/>
                    <p>Cereais Continente</p> 
                    <p><h4>Cadeia Logistica: </h4>Produto Agrícula, 500kms pelo Transportador; Produtor Industrial, 125kms pelo Transportador; Grossista, 80kms pelo Transportador; Retalhista</p>
                    <p><h4>Recursos Consumidos: </h4>1000 L de Água, 2000 kW de Eletricidade, 162L de Gasóleo</p>
                    <p><h4>Poluição Gerada: </h4>9.4 kg CO2</p>
                    <button type="button" className="btn btn2" id='btnComprar'>BUY</button>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="caixasComparador">
                    <img src={cereais2} className="card-img-top" alt="..."/>
                    <p>Cereais c/ Chocolate Negro Continente</p> 
                    <p><h4>Cadeia Logistica: </h4>Produto Agrícula, 500kms pelo Transportador; Produtor Industrial, 125kms pelo Transportador; Grossista, 80kms pelo Transportador; Retalhista</p>
                    <p><h4>Recursos Consumidos: </h4>1000 L de Água, 2000 kW de Eletricidade, 162L de Gasóleo</p>
                    <p><h4>Poluição Gerada: </h4>9.4 kg CO2</p>
                    <button type="button" className="btn btn2" id='btnComprar'>BUY</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )


}

export default Comparador;
