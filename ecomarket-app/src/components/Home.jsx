import React from "react";

const cat1 = require('../images/alimentacao.png');
const cat2 = require('../images/tecnologia.png');
const cat3 = require('../images/vestuario.png');
const cat4 = require('../images/casa.png');
const cat5 = require('../images/animais.png');
const cat6 = require('../images/desporto.png');
const cat7 = require('../images/jardim.png');

function Home() {
    return (

    <div className="position-absolute top-50 start-50 translate-middle">

        
            {/* <div className="row">
                <div className="col-md-8">
                    <div className="card" style={{width: "30rem"}}>
                    <img src={cat1} className="card-img-top" alt="..."/>
                    </div>
                </div>
                <div className="col-6 col-md-4">
                    <div className="card" style={{width: "30rem"}}>
                    <img src={cat2} className="card-img-top" alt="..."/>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-6 col-md-4">
                    <div className="card" style={{width: "30rem"}}>
                    <img src={cat3} className="card-img-top" alt="..."/>
                    </div>
                </div>

                <div className="col-6 col-md-4">
                    <div className="card" style={{width: "30rem"}}>
                    <img src={cat4} className="card-img-top" alt="..."/>
                    </div>
                </div>
                <div className="col-6 col-md-4">
                    <div className="card" style={{width: "30rem"}}>
                    <img src={cat5} className="card-img-top" alt="..."/>
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="col-6">
                    <div className="card" style={{width: "30rem"}}>
                    <img src={cat6} className="card-img-top" alt="..."/>
                    </div>
                </div>
                <div className="col-6">
                    <div className="card" style={{width: "30rem"}}>
                    <img src={cat7} className="card-img-top" alt="..."/>
                    </div>

                </div>
            </div> */}
        <div className="rowH">
            <div className="column">
                <img src={cat1} className="card-img-top" alt="..."/>
                <img src={cat2} className="card-img-top" alt="..."/>
            </div>
            <div className="column">
                <img src={cat4} className="card-img-top" alt="..."/>
                <img src={cat5} className="card-img-top" alt="..."/>
            </div>
            <div className="column">
                <img src={cat6} className="card-img-top" alt="..."/>
                <img src={cat7} className="card-img-top" alt="..."/>
            </div>
        </div>
    </div>

        
    );
}

export default Home;