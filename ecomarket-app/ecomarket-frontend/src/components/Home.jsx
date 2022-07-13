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
        <div className="position-absolute showItems">

            <div className="headline" >
                <h2>Bem-vindo ao EcoMarket!</h2>
                <h5>Faça aqui as suas compras mais eco</h5>
                <p>Aqui vai poder fazer as melhoras compras tendo em conta o que realmente importa, o ambiente</p>
                <p>Este pequeno market foi desenvolvido por 3 alunos da Licenciatura em Tecnologias de Informação:</p>
                <ul>
                    <li>Inês Marcelino</li>
                    <li>José Sousa</li>
                    <li>Sofia Lourenço</li>
                </ul>
            </div>
            
        
        </div>
    </div>
        
    );
}

export default Home;