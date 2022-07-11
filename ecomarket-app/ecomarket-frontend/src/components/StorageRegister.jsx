/* eslint-disable no-multi-str */
import Axios from 'axios';
import { useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';


function StorageRegister(){
    const { user } = useAuth0();
    const forn = 3; //user.email;
    const [moradaArm, setMoradaArm]     = useState('');
    // const [codpostal, setCodPostal]     = useState('');
    // const [dist, setDist]               = useState('');
    // const [conc, setConc]               = useState('');
    
    // document.body.onload = function(){distritos()};

    const handler = (x) => {
        var url = (process.env.REACT_APP_TEST === "true") ? process.env.REACT_APP_TEST_IP : process.env.REACT_APP_DOMAIN;
        switch(x.target.name) {
            case "morada":
                setMoradaArm(x.target.value);
                break;
            case "submit":
                x.preventDefault();
                if (moradaArm === '') {
                    // setError(true)
                } else {
                    Axios.post(url+"/api/v1/providers/reg_storage", {
                        prov: forn,
                        morada: moradaArm
                    }).then((response) => {
                        console.log(response);
                        if (response.data.message === "success") {
                            window.location.href = "http://localhost:3000/provider"; // to be changed
                        }
                    })
                }
                break;
            default:
                console.log();
        }
    }

    return(
        <div>
        <div className="cardForn position-absolute top-50 start-50 translate-middle">
            <div className="card-body">
                <h5 className="card-title">FORNECEDOR:</h5>
                <h6 className="card-subtitle mb-2">Registe aqui o armazém</h6>
                <form method="post">
                    <div className="col-md-12">
                    <label>Morada</label> {/*  falta coordenadas */}
                        <input className="form-control" type="text" name="morada" size="50" onChange={handler} required/>
                    </div>                
                    <button id="submit" type="submit" name="submit" className="btn btn2" onClick={handler}>Registar</button>
                </form>
            </div>
        </div> 
        </div>
    );

}

export default StorageRegister;