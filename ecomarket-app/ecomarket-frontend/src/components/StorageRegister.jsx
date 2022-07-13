/* eslint-disable no-multi-str */
import Axios from 'axios';
import { useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';


function StorageRegister(){
    const { user, isLoading }   = useAuth0();
    const [pid, setPID]         = useState('');
    const [papel, setPapel]     = useState('');
    const [rua, setRua]         = useState('');
    const [dist, setDist]       = useState('');
    const [conc, setConc]       = useState('');
    const [prefix, setPrefix]   = useState('');
    const [sufix, setSufix]     = useState('');

    const [distOK, setDOK]      = useState(false);
    var url = (process.env.REACT_APP_TEST === "true") ? process.env.REACT_APP_TEST_IP : process.env.REACT_APP_DOMAIN;
    
    
    const getsUser = () => {
        Axios.get(url+"/api/v2/users", {
            params: {
              email: user.email
          }}).then((response) => {
            if (response.data.message !== 'fail') {
              setPapel(response.data.results[0].papel)
              setPID(response.data.results[0].id);
            }
          });
    }

    getsUser();

    const distritos = () => {
        Axios.get(url+"/api/v1/gets/distritos").then((response) => {
            var dist = response.data.results;
            for (var i = 0; i < dist.length; i++) {
                document.getElementById("distritos").innerHTML += "<option value='" + dist[i]["id"] + "'>" + dist[i]["nome"] + "</option>";
            }
        });
        setDOK(true);
    }

    const concelhos = (x) => {
        document.getElementById("concelhos").innerHTML = "<option value='' selected>Selecione um Concelho</option>";
        Axios.get(url+"/api/v1/gets/concelhos", { 
            params: { 
                dist: x.target.value
            }}).then((response) => {
                var conc = response.data.results;
                for (var i = 0; i < conc.length; i++) {
                    document.getElementById("concelhos").innerHTML += "<option value='" + conc[i]["id"] + "'>" + conc[i]["nome"] + "</option>";
                }
        });
    }

    if (isLoading) {
        return (<div></div>);
    } else {

        const handler = (x) => {
            var url = (process.env.REACT_APP_TEST === "true") ? process.env.REACT_APP_TEST_IP : process.env.REACT_APP_DOMAIN;
            switch(x.target.name) {
                case "rua":
                    setRua(x.target.value);
                    break;
                case "distrito":
                    setDist(x.target.value);
                    break;
                case "concelho":
                    setConc(x.target.value);
                    break;
                case "prefix":
                    if (prefix.length < 4 || x.target.value.length < 4) {
                        setPrefix(x.target.value.replace(/[^0-9]/gi, ''));
                    }
                    break;
                case "sufix":
                    if (sufix.length < 3 || x.target.value.length < 3) {
                        setSufix(x.target.value.replace(/[^0-9]/gi, ''));
                    }
                    break;
                case "submit":
                    x.preventDefault();
                    if (rua !== '' && dist !== '' && conc !== '' && prefix !== '') {
                        Axios.post(url+"/api/v1/providers/reg_storage", {
                            prov: pid,
                            rua: rua,
                            conc: conc, 
                            dist: dist,
                            prefix: prefix,
                            sufix: sufix
                        }).then((response) => {
                            console.log(response);
                            if (response.data.message === "success") {
                                window.location = "/provider";
                            }
                        })
                    }
                    break;
                default:
                    console.log();
            }
        }

        if (papel === 3 || papel === 4) {
            if (!distOK) {
                distritos();
            }

            return(
                <div>
                <div className="cardForn position-absolute top-50 start-50 translate-middle">
                    <div className="card-body">
                        <h5 className="card-title">FORNECEDOR:</h5>
                        <h6 className="card-subtitle mb-2">Registe aqui o armazém</h6>
                        <form method="post">
                            <div className="col-md-12">
                                <label>Rua</label>
                                <input className="form-control" type="text" name="rua" size="50" onChange={handler} required />
                            </div>
                            <div className="col-md-12">
                                <label>Distrito</label>
                                <select className="form-select" name="distrito" id="distritos" onChange={handler} onInput={concelhos} required>
                                    <option value='' selected>Selecione um Distrito</option>
                                </select>
                            </div>
                            <div className="col-md-12">
                                <label>Concelho</label>
                                <select className="form-select" name="concelho" id="concelhos" onChange={handler} required>
                                    <option value='' selected>Selecione um Concelho</option>
                                </select>
                            </div>
                            <div className="col-md-12">
                                <label>Código Postal</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" pattern="[0-9]{4}" name="prefix" value={prefix} onChange={handler} required />
                                    <span class="input-group-text">-</span>
                                    <input type="text" class="form-control" pattern="[0-9]{3}" name="sufix" value={sufix} onChange={handler} required />
                                </div>
                            </div>              
                            <button id="submit" type="submit" name="submit" className="btn btn2" onClick={handler}>Registar</button>
                        </form>
                    </div>
                </div> 
                </div>);
            }
    }
}

export default StorageRegister;