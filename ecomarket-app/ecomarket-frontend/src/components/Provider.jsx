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
                    document.getElementById("linhas").innerHTML += "<tr>\
                                                                        <th>"+encomendas[i].id+"</th>\
                                                                        <th>"+encomendas[i].data+"</th>\
                                                                        <th>"+transp(encomendas[i].transportador)+"</th>\
                                                                        <th>"+encomendas[i].total+"</th>\
                                                                        <th> Botão para a order.jsx respetiva</th>\
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
                    document.getElementById("linhas").innerHTML += "<tr>\
                                                                        <th>"+produtos[i].id+"</th>\
                                                                        <th>"+produtos[i].nome+"</th>\
                                                                        <th>"+produtos[i].producao+"</th>\
                                                                        <th>"+produtos[i].tipo+"</th>\
                                                                        <th>"+produtos[i].subtipo+"</th>\
                                                                        <th>"+produtos[i].preco+"€</th>\
                                                                        <th> Botão para a product.jsx respetiva</th>\
                                                                    </tr>";
                }
            }
        });
    }

    const store = () => {

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
                        <th>Transportador</th>
                        <th>Estado</th>
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
                        <th>Localização</th>
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