/* eslint-disable no-multi-str */
import React, { useState } from 'react';
import Axios from "axios";
import {Link } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

function Transporter () {
    const { user, isLoading }   = useAuth0();
    const [tid, setTID]         = useState('');
    const [papel, setPapel]     = useState('');
    const [encOK, setEOK]       = useState(false);
    const [carOK, setCOK]       = useState(false);
    var url = (process.env.REACT_APP_TEST === "true") ? process.env.REACT_APP_TEST_IP : process.env.REACT_APP_DOMAIN;

    if (isLoading) {
        return (<div></div>);
    } else {
        const getsUser = () => {
            Axios.get(url+"/api/v2/users", {
                params: {
                  email: user.email
              }}).then((response) => {
                if (response.data.message !== 'fail') {
                  setPapel(response.data.results[0].papel)
                  setTID(response.data.results[0].id);
                }
              });
        }
        getsUser();

        const enc = () => {
            Axios.get(url+"/api/v1/transporters/orders", {
                params: {
                    tid: tid
            }}).then ((response) => {
                if (response.data.message !== "fail") {
                    var encomendas = response.data.results;
                    for (var i = 0; i < encomendas.length; i++) {
                        document.getElementById("trans_enc").innerHTML += `<tr>\
                                                                                <td>${encomendas[i].id}</td>\
                                                                                <td>${encomendas[i].cons}</td>\
                                                                                <td>${encomendas[i].data.substring(0,10)}</td>\
                                                                                <td id="carro${encomendas[i].id}"></td>\
                                                                                <td>${encomendas[i].estado}</td>\
                                                                                <td>${encomendas[i].total}€</td>\
                                                                                <td class=''><a href='http://localhost:3000/order/${encomendas[i].id}' id='profile'><button type='button' class='btn btn3'>Ver</button></a></td>
                                                                            </tr>`;
                        carro(encomendas[i].car, encomendas[i].id);
                    }
                }
            });
            setEOK(true);
        }
    
        const carro = (c, i) => {
            if (typeof c === "number") {
                document.getElementById("carro"+i).innerText = c;
            } else {
                document.getElementById("carro"+i).innerHTML = `<a href='http://localhost:3000/selectCar/${i}' id='profile'><button type='button' class='btn btn5'>Selecione um Carro</button></a>`;
                return;
            }
        }
    
        const car = () => {
            Axios.get(url+"/api/v1/transporters/cars", {
                params: {
                    tid: tid
            }}).then ((response) => {
                if (response.data.message !== "fail") {
                    var cars = response.data.results;
                    for (var i = 0; i < cars.length; i++) {
                        document.getElementById("trans_car").innerHTML += "<tr>\
                                                                            <td>"+cars[i].id+"</td>\
                                                                            <td>"+cars[i].marca+"</td>\
                                                                            <td>"+cars[i].ano+"</td>\
                                                                            <td>"+comb(cars[i].combustivel)+"</td>\
                                                                            <td>"+cars[i].quantidade+" " + consumo(cars[i].unidade)+"</td>\
                                                                            <td>"+matricula(cars[i].matricula)+"</td>\
                                                                        </tr>";
                    }
                }
            });
            setCOK(true);
        }
    
        const comb = (x) => {
            switch (x) {
                case 1:
                    return "Gasolina";
                case 2:
                    return "Gasóleo";
                case 3:
                    return "Elétrico";
                default:
                    break;
            }
        }
    
        const consumo = (x) => {
            switch(x) {
                case 1:
                    return "lts/100Kms";
                case 2:
                    return "kWatts/100Kms";
                default:
                    break;
            }
        }
        
        const matricula = (x) => {
            return x.substring(0,2) + "-" + x.substring(2,4) + "-" + x.substring(4);
        }

        if (papel === 5) {
            
            const transp = () => {
                if (!encOK) {
                    enc();
                }

                if (!carOK && encOK) {
                    car();
                }
            }
            transp();
        
            return(
                <div className="position-absolute showItems">
                    <div className="container">
                        <h3>Encomendas</h3>     
                    </div>
                    <br />
                    <div className="container">
                    <table className="table table-bordered" id='centrar'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Consumidor</th>
                                <th>Data</th>
                                <th>Carro</th>
                                <th>Estado</th>
                                <th>Valor Total</th>
                                <th>-- --</th>
                            </tr>
                        </thead>
                        <tbody id="trans_enc">
                        </tbody>
                    </table>
                    </div>
        
                    <div className="container">
                        <Link to ='/carRegister' ><button className="btn btn2">Adicionar</button></Link>
                        <br />
                        <h3>Veículos</h3>     
                    </div>
                    <br />
                    <div className="container">
                    <table className="table table-bordered" id='centrar'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Marca</th>
                                <th>Ano</th>
                                <th>Combustível</th>
                                <th>Consumo</th>
                                <th>Matrícula</th>
                            </tr>
                        </thead>
                        <tbody id="trans_car">
                        </tbody>
                    </table>
                    </div>
                </div>
            )
        } else {
            return (<div></div>);
        }
    }
}

export default Transporter;