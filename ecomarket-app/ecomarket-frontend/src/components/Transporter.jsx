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
                    document.getElementById("prov_enc").innerHTML += "<tr>\
                                                                        <th>"+encomendas[i].id+"</th>\
                                                                        <th>"+encomendas[i].data+"</th>\
                                                                        <th>"+status(encomendas[i].transp)+"</th>\
                                                                        <th>"+encomendas[i].total+"</th>\
                                                                        <th> Botão para a order.jsx respetiva</th>\
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
                    document.getElementById("prov_prod").innerHTML += "<tr>\
                                                                        <th>"+produtos[i].id+"</th>\
                                                                        <th>"+produtos[i].marca+"</th>\
                                                                        <th>"+produtos[i].ano+"</th>\
                                                                        <th>"+produtos[i].combustivel+"</th>\
                                                                        <th>"+produtos[i].caixa+"</th>\
                                                                        <th>"+produtos[i].emissao+"€</th>\
                                                                        <th> Botão para a product.jsx respetiva</th>\
                                                                    </tr>";
                }
            }
        });
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