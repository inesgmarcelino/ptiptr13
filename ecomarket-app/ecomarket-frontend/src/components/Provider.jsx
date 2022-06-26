/* eslint-disable no-multi-str */
import React from 'react';
import Axios from "axios";
import {Link } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

function Provider () {
    const { user } = useAuth0();
    const pid = 3;
    
    document.body.onload = function(){prov()};

    const prov = () => {
        enc();
        prod();
        store();
    }

    const enc = () => {
        Axios.get("https://ecomarket.works/api/v1/providers/orders", {
            params: {
                pid: pid
        }}).then ((response) => {
            if (response.data.message !== "fail") {
                var encomendas = response.data.results;
                for (var i = 0; i < encomendas.length; i++) {
                    document.getElementById("prov_enc").innerHTML += "<tr>\
                                                                        <td>"+encomendas[i].id+"</td>\
                                                                        <td>"+encomendas[i].consumidor+"</td>\
                                                                        <td>"+encomendas[i].data.substring(0,10)+"</td>\
                                                                        <td>"+transp(encomendas[i].transportador)+"</td>\
                                                                        <td>"+encomendas[i].total+"</td>\
                                                                        <td> Botão para a order.jsx respetiva</td>\
                                                                    </tr>";
                }
            }
        });
    }

    const transp = (t) => {
        if (t === null) {
            return (
                <button></button> //botão para escolher transportador
            ); 
        } else {
            return t;
        }
    }
    const prod = () => {
        Axios.get("https://ecomarket.works/api/v1/providers/products", {
            params: {
                pid: pid
        }}).then ((response) => {
            if (response.data.message !== "fail") {
                var produtos = response.data.results;
                for (var i = 0; i < produtos.length; i++) {
                    document.getElementById("prov_prod").innerHTML += "<tr>\
                                                                        <td>"+produtos[i].id+"</td>\
                                                                        <td>"+produtos[i].nome+"</td>\
                                                                        <td>"+produtos[i].producao+"</td>\
                                                                        <td>"+produtos[i].tipo+"</td>\
                                                                        <td>"+produtos[i].subtipo+"</td>\
                                                                        <td>"+produtos[i].preco+"€</td>\
                                                                        <td> Botão para a product.jsx respetiva</td>\
                                                                    </tr>";
                }
            }
        });
    }

    const store = () => {
        Axios.get("https://ecomarket.works/api/v1/providers/storages", {
            params: {
                pid: pid
        }}).then ((response) => {
            if (response.data.message !== "fail") {
                var storages = response.data.results;
                for (var i = 0; i < storages.length; i++) {
                    document.getElementById("prov_stor").innerHTML += "<tr>\
                                                                        <td>"+storages[i].id+"</td>\
                                                                        <td>"+storages[i].morada+"</td>\
                                                                        <td>"+cpostal(storages[i].cpostal)+"</td>\
                                                                        <td>"+storages[i].distrito+"</td>\
                                                                        <td>"+storages[i].concelho+"</td>\
                                                                    </tr>";
                }
            }
        });
    }

    const cpostal = (cp) => {
        return cp.substring(0,4) + "-" + cp.substring(4);
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
                        <th>Transportador</th>
                        <th>Valor Total</th>
                        <th>-- --</th>
                    </tr>
                </thead>
                <tbody id="prov_enc">
                </tbody>
            </table>
            </div>

            <div className="container">
                <Link to ='' ><button className="btn">Adicionar</button></Link>
                <br />
                <h3>Produtos</h3>     
            </div>
            <br />
            <div className="container">
            <table className="table table-bordered" id='centrar'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Data de Produção</th>
                        <th>Tipo</th>
                        <th>Subtipo</th>
                        <th>Preço</th>
                        <th>-- --</th>
                    </tr>
                </thead>
                <tbody id="prov_prod">
                </tbody>
            </table>
            </div>

            <div className="container">
                <Link to ='' ><button className="btn">Adicionar</button></Link>
                <br />
                <h3>Armazéns</h3>
            </div>
            <br />
            <div className="container">
            <table className="table table-bordered" id='centrar'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Morada</th>
                        <th>Código Postal</th>
                        <th>Distrito</th>
                        <th>Concelho</th>
                    </tr>
                </thead>
                <tbody id="prov_stor">
                </tbody>
            </table>
            </div>
        </div>
    )


}

export default Provider;