/* eslint-disable no-multi-str */
import React from 'react';
import Axios from "axios";
import {Link } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

function Transporter () {
    const { user } = useAuth0();
    const tid = 4;
    
    document.body.onload = function(){transp()};

    const transp = () => {
        enc();
        car();
    }

    const enc = () => {
        Axios.get("https://ecomarket.works/api/v1/transporters/orders", {
            params: {
                tid: tid
        }}).then ((response) => {
            if (response.data.message !== "fail") {
                var encomendas = response.data.results;
                for (var i = 0; i < encomendas.length; i++) {
                    document.getElementById("trans_enc").innerHTML += "<tr>\
                                                                        <td>"+encomendas[i].id+"</td>\
                                                                        <td>"+encomendas[i].consumidor+"</td>\
                                                                        <td>"+encomendas[i].data.substring(0,10)+"</td>\
                                                                        <td>"+status(encomendas[i].transp)+"</td>\
                                                                        <td>"+encomendas[i].total+"</td>\
                                                                        <td> Botão para a order.jsx respetiva</td>\
                                                                    </tr>";
                }
            }
        });
    }

    const status = (t) => {
        if (t === 'NO') {
            return "Em trânsito";
        } else {
            return "Entregue";
        }
    }

    const car = () => {
        Axios.get("https://ecomarket.works/api/v1/transporters/cars", {
            params: {
                tid: tid
        }}).then ((response) => {
            if (response.data.message !== "fail") {
                var produtos = response.data.results;
                for (var i = 0; i < produtos.length; i++) {
                    document.getElementById("trans_car").innerHTML += "<tr>\
                                                                        <td>"+produtos[i].id+"</td>\
                                                                        <td>"+produtos[i].marca+"</td>\
                                                                        <td>"+produtos[i].ano+"</td>\
                                                                        <td>"+comb(produtos[i].combustivel)+"</td>\
                                                                        <td>"+caixa(produtos[i].caixa)+"</td>\
                                                                        <td>"+produtos[i].emissao+"g/km</td>\
                                                                        <td> Botão para a product.jsx respetiva</td>\
                                                                    </tr>";
                }
            }
        });
    }

    const comb = (x) => {
        switch (x) {
            case 1:
                return "Gasolina";
            case 2:
                return "Gasóleo";
            case 3:
                return "GPL";
            case 4:
                return "Elétrico";
            case 5:
                return "Híbrido";
            default:
                break;
        }
    }

    const caixa = (x) => {
        switch (x) {
            case 1:
                return "Manual";
            case 2:
                return "Automática";
            default:
                break;
        }
    }

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
                <Link to ='' ><button className="btn">Adicionar</button></Link>
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
                        <th>Caixa</th>
                        <th>Emissão CO2</th>
                    </tr>
                </thead>
                <tbody id="trans_car">
                </tbody>
            </table>
            </div>
        </div>
    )


}

export default Transporter;