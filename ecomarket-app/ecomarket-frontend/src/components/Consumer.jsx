/* eslint-disable no-multi-str */
import React from 'react'
import Axios from "axios";
import {Link } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';

function Consumer () {
    const { user } = useAuth0();
    const cid = 2;
    const [encomendas, setEncomendas]   = useState(null);

    const enc = () => {
        Axios.get("https://ecomarket.works/api/v1/consumers/orders", {
            params: cid
        }).then ((response) => {
            if (response.data.message !== "fail") {
                setEncomendas(response.data.results);
            }
        })
    }

    const linhas = () => {
        encomendas.forEach(encomenda => {
            document.getElementById("linhas").innerHTML += "<tr>\
                                                                <th>"+encomenda.id+"</th>\
                                                                <th>"+encomenda.data+"</th>\
                                                                <th>"+encomenda.fornecedor+"</th>\
                                                                <th>"+encomenda.transportador+"</th>\
                                                                <th>"+encomenda.total+"</th>\
                                                            </tr>";
        });
    }

    return(
        <div className="position-absolute showItems">
            <div className="container">
                <Link to ='/profile' ><button type="button" className="btn">Voltar</button></Link>
                <br />
                <h3>As minhas encomendas</h3>     
                
            </div>
            <br />
            <div className="container">
            <table className="table table-bordered" id='centrar'>
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Data</th>
                        <th>Fornecedor</th>
                        <th>Transportador</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody id ="linhas">
                    {linhas}
                </tbody>
            </table>
            </div>
        </div>
    )


}

export default Consumer;

