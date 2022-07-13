/* eslint-disable no-multi-str */
import Axios from "axios";
import {Link } from "react-router-dom";
import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from "react-router-dom";

function SelectCar () {
    const { user, isLoading }   = useAuth0();
    let { id }                  = useParams();
    const [tid, setTID]         = useState('');
    const [papel, setPapel]     = useState('');
    const [carOK, setCOK]      = useState(false);
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

        const cars = () => {
            Axios.get(url+"/api/v1/transporters/cars", {
                params: {
                    tid: tid
            }}).then ((response) => {
                if (response.data.message !== "fail") {
                    var cars = response.data.results;
                    for (var i = 0; i < cars.length; i++) {
                        document.getElementById("cars").innerHTML += `<tr>\
                                                                            <td>${cars[i].id}</td>\
                                                                            <td>${cars[i].marca}</td>\
                                                                            <td>${cars[i].ano}</td>\
                                                                            <td>${comb(cars[i].combustivel)}</td>\
                                                                            <td>${cars[i].quantidade} ${consumo(cars[i].unidade)}</td>\
                                                                            <td>${matricula(cars[i].matricula)}</td>\
                                                                            <td><a href='${url}/api/v1/transporters/add_car?id=${id}&car=${cars[i].id}' id='profile'><button type='button' class='btn btn3'>Selecionar</button></a></td>\
                                                                        </tr>`;
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

            if (!carOK) {
                cars();
            }

            return(<div className="position-absolute showItems">
                        <div className="container">
                            <h3>Escolha um Carro</h3>     
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
                                    <th>-- --</th>
                                </tr>
                            </thead>
                            <tbody id="cars">
                            </tbody>
                        </table>
                        </div>
                    </div>);
        }
    }
}


export default SelectCar;