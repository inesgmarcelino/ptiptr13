/* eslint-disable no-multi-str */
import Axios from 'axios';
import { useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';

function ProductExists() {
    var url = (process.env.REACT_APP_TEST === "true") ? process.env.REACT_APP_TEST_IP : process.env.REACT_APP_DOMAIN;
    const { user, isLoading }   = useAuth0();

    const [pid, setPID]         = useState('');
    const [papel, setPapel]     = useState('');

    const [prod, setProd]               = useState('');
    const [quantidade, setQuantidade]   = useState('');
    const [armazem, setArmazem]         = useState('');
    const [prodOK, setPOK]                   = useState(false);
    const [armzOK, setAOK]                  = useState(false);

    if (isLoading) {
        return(<div></div>);
    } else {
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

        const prods = () => {
            Axios.get(url+"/api/v1/providers/products", {
                params: {
                    pid: pid
            }}).then((response) => {
                var prods = response.data.results;
                for (var i = 0; i < prods.length; i++) {
                    document.getElementById("produtos").innerHTML += "<option value='" + prods[i]["id"] + "'>" + prods[i]["nome"] + "</option>";
                }
            });
            setPOK(true);
        }
    
        const armazens = () => {
            Axios.get(url+"/api/v1/providers/storages", {
                params : {
                    pid: pid
                }
            }).then((response) => {
                var store = response.data.results;
                for (var i = 0; i < store.length; i++) {
                    document.getElementById("armazens").innerHTML += "<option value='" + store[i]["id"] + "'>" + store[i]["rua"] + "</option>";
                }
            });
            setAOK(true);
        }
    
        const handler = (x) => {
            switch(x.target.name) {
                case "produto":
                    setProd(x.target.value);
                    break;
                case "quantidade":
                    setQuantidade(x.target.value);
                    break;
                case "armazem":
                    setArmazem(x.target.value);
                    break;
                case "submit":
                    x.preventDefault();
                    if (prod !== '' && quantidade !== '' && armazem !== '') {
                        Axios.post(url+"/api/v1/providers/reg_product", {
                            prov: pid,
                            existe: true,
                            prod: prod,
                            quant: quantidade,
                            storage: armazem
                        }).then((response) => {
                            if (response.data.message === 'success') {
                                window.location.href = "http://localhost:3000/provider";  //to be changed
                            }
                        });
                    }
                    break;
                default:
                    console.log();
            }
        }

        if (papel === 3 || papel === 4) {
            if (!prodOK) {
                prods();
            }

            if (!armzOK) {
                armazens();
            }

            return (<div className="cardForn position-absolute top-50 start-50 translate-middle" id="card">
                        <div className="card-body">
                            <h5 className="card-title">FORNECEDOR:</h5>
                            <h6 className="card-subtitle mb-2">Registe aqui os aspetos gerais do Produto</h6>
                            <form method='post'>
                                <div class='col-md-12'>
                                    <label>Nome do Produto:</label>
                                    <select class='form-select' name='produto' id='produtos' onChange={handler} required >
                                        <option value='' selected>Selecione um Produto</option>
                                    </select>
                                </div>
                                <div className="col-md-12">
                                    <label>Quantidade em Stock</label>
                                    <input className="form-control" type="number" name="quantidade"  size="50" onChange={handler} required/>
                                </div>

                                <div className="col-md-12">
                                    <label>Armazém</label>
                                    <select className="form-select" name="armazem" id="armazens" onChange={handler} required>
                                        <option value='' selected>Selecione um Armazém</option>
                                    </select>
                                </div>
                                <button id="submit" type="submit" name="submit" className="btn btn2" onClick={handler}>Registar</button>
                            </form>
                        </div>
                    </div>);
        }
    }


}
export default ProductExists;