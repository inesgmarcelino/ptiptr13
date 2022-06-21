import Axios from 'axios';
import { useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';


function ArmazemRegister(){
    const { user } = useAuth0();
    const forn = "forn1@ecomarket.pt"; //user.email;
    const [moradaArm, setMoradaArm]     = useState('');
    const [codpostal, setCodPostal]     = useState('');
    const [dist, setDist]               = useState('');
    const [conc, setConc]               = useState('');
    var cp = "xxxx-xxx";
    
    const handler = (x) => {
        switch(x.target.name) {
            case "morada":
                setMoradaArm(x.target.value);
                break;
            case "codigoPostal1":
                var cod = 0;
                if (x.target.value < 1000 && x.target.value > 99) {
                    cod = parseInt('0'+ x.target.value);
                } else if (x.target.value < 100 && x.target.value > 9) {
                    cod = parseInt('00' + x.target.value);
                } else if (x.target.value < 10) {
                    cod = parseInt('000' +  x.target.value);
                } else {
                    cod = x.target.value;
                }

                var c = cp.split('-');
                cp = cod + '-' + c[1];
                if (c[1] !== "xxx") {
                    setCodPostal(cp);
                }
                break;
            case "codigoPostal2":
                var cod1 = 0;
                if (x.target.value < 100 && x.target.value > 9) {
                    cod1 = parseInt^('0' + x.target.value);
                } else if (x.target.value < 10) {
                    cod1 = parseInt('00' + x.target.value);
                } else {
                    cod1 = x.target.value;
                }

                var c1 = cp.split('-');
                cp = c1[0] + '-' + cod1;
                if (c1[0] !== "xxxx") {
                    setCodPostal(cp);
                }
                break;
            case "distrito":
                setDist(x.target.value);
                concelhos();
                break;
            case "concelho":
                setConc(x.target.value);
                break;
            case "submit":
                x.preventDefault();
                if (moradaArm === '' || codpostal === '' || 'x' in codpostal || dist === '' || conc === '') {
                    // setError(true)
                } else {
                    Axios.post("https://ecomarket.works/api/v1/providers/reg_storage", {
                        email: forn,
                        morada: moradaArm,
                        codpostal: codpostal,
                        dist: dist,
                        conc: conc
                    }).then((response) => {
                        console.log(response);
                    })
                }
                break;
            default:
                console.log();
        }
    }

    const distritos = () => {
        Axios.get("https://ecomarket.works/api/v1/gets/distritos").then((response) => {
            var dist = response.data.results;
            for (var i = 0; i < dist.length; i++) {
                document.getElementById("distritos").innerHTML += "<option value='" + dist[i]["id"] + "'>" + dist[i]["nome"] + "</option>";
            }
        });
    }

    const concelhos = () => {
        Axios.get("https://ecomarket.works/api/v1/gets/concelhos", { 
            params: { 
                dist: dist
        }}).then((response) => {
            var conc = response.data.results;
            for (var i = 0; i < conc.length; i++) {
                document.getElementById("concelhos").innerHTML += "<option value='" + conc[i]["id"] + "'>" + conc[i]["nome"] + "</option>";
            }
        });
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
                         <div className="col-md-12">
                            <label>Código Postal</label>
                                <input className="form-control" type="text" pattern="^\d{4}-\d{3}?$" name="codigoPostal" size="50" onChange={handler} required/>
                         </div>
                         <div className="col-md-12">
                            <label>Distrito</label>
                                <select className="form-select" name="distrito" id="distritos" onChange={handler} onMouseOver={distritos} required>
                                    <option value='' selected>Selecione um Distrito</option>
                                </select>
                         </div>
                         <div className="col-md-12">
                            <label>Concelho</label>
                                <select className="form-select" name="concelho" id="concelhos" onChange={handler} required>
                                    <option value='' selected>Selecione um Concelho</option>
                                </select>
                         </div>
                        
                         <button id="submit" type="submit" name="submit" className="btn" onClick={handler}>Registar</button>
                     </form>
            </div>
        </div> 
        </div>
    );
}

export default ArmazemRegister;