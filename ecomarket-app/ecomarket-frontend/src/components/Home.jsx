import React, { useState } from "react";
// import Axios from "axios";

const cat1 = require('../images/alimentacao.png');
const cat2 = require('../images/tecnologia.png');
const cat3 = require('../images/vestuario.png');
const cat4 = require('../images/casa.png');
const cat5 = require('../images/animais.png');
const cat6 = require('../images/desporto.png');
const cat7 = require('../images/jardim.png');

function Home() {

    // const [categorie, setCategorie] = useState('');

    // const goCategorie = (x)  => {
    //     //enviar para a categorie definida
    // }

    // const cat = () => {
    //     // api para saber os dados de todos os tipos que existem (nome, id, etc)
    //     // foreach (c in result) {
    //         // <a href="LINK">
    //         //     <div className="card mb-3">
    //         //         <img src={img} className="card-img-top" alt="..."/>
    //         //         <br />
    //         //         <h5 className="card-title mx-auto my-0"> NAME </h5>
    //         //     </div>
    //         // </a>
    //     // }
    // }

    return (
    <div>
        <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <h1 className="display-4">Bem vindo ao EcoMarket!</h1>
                <p className="lead">Faça aqui as suas compras mais eco</p>
            </div>
        </div>

        <div className="d-flex justify-content-around home" >
            <div className=" card-title column mx-5">
                <h5 className=" mx-auto my-0">Iniciar Sessão</h5>
                <p>Já tem conta? <br></br>Inicie Aqui a sua sessão</p>
            </div>
            <div className="card-title column mx-5">
                <h5 className="mx-auto my-0">Catálogo</h5>
                <p>Veja aqui os nossos produto.</p>
            </div>
            <div className="card-title column mx-5">
                <h5 className="mx-auto my-0">Criar Conta</h5>
                <p>Ainda não tem conta?<br></br>Crie Aqui</p>
            </div>

        </div>
    </div>
        
    );
}

export default Home;