import React from "react";
import {Link } from "react-router-dom";

const cereais1 = require('../images/cereaisGoldenGraham.jpg');


function Product() {


    return(
        <div className="position-absolute showItems">
            <div className="container">
                <Link to ='/profile' ><button id='profileButton'>Voltar</button></Link>
                <br />
                <h3>Cereais Golden Graham</h3>     
            </div>
            <br />
            <div class="container-fluid">
            <div class="row">
                <div class="col-lg-4">
                    <img src={cereais1} className="card-img-top" alt="..."/>
                </div>
                <div class="col-lg-8">
                    <div class="caixaProduto">
                       <div class="preco" id='centrar'>3.29&euro;/unidade</div> {/* Chamar aqui o preço do produto da base de dados */}
                       <button id='buttonProduct' >BUY</button>
                       <br />
                        <p><h4>Cadeia Logistica: </h4>Produto Agrícula, 500kms pelo Transportador; Produtor Industrial, 125kms pelo Transportador; Grossista, 80kms pelo Transportador; Retalhista</p>
                        <p><h4>Recursos Consumidos: </h4>1000 L de Água, 2000 kW de Eletricidade, 162L de Gasóleo</p>
                        <p><h4>Poluição Gerada: </h4>9.4 kg CO2</p>
                    </div>
                </div>
            </div>
            </div>

        </div>
    )
}

export default Product;
