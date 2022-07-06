/* eslint-disable no-multi-str */
import Axios from 'axios';
import { useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';

function ProductExists() {
    var url = (process.env.REACT_APP_TEST === "true") ? process.env.REACT_APP_TEST_IP : process.env.REACT_APP_DOMAIN;
    const id = 3 //temporario

    document.body.onload = function(){go()};

    const go = () => {
        armazens();
        prods();
    }

    const prods = () => {
        Axios.get(url+"/api/v1/providers/products", {
            params: {
                pid: id
        }}).then((response) => {
            var prods = response.data.results;
            for (var i = 0; i < prods.length; i++) {
                document.getElementById("produtos").innerHTML += "<option value='" + prods[i]["id"] + "'>" + prods[i]["nome"] + "</option>";
            }
        });
    }

    const armazens = () => {
        Axios.get(url+"/api/v1/providers/storages", {
            params : {
                pid: id
            }
        }).then((response) => {
            var store = response.data.results;
            for (var i = 0; i < store.length; i++) {
                document.getElementById("armazens").innerHTML += "<option value='" + store[i]["id"] + "'>" + store[i]["rua"] + "</option>";
            }
        });
    }

    const handler = (x) => {

    }
    return (
        <div className="cardForn position-absolute top-50 start-50 translate-middle" id="card">
            <div className="card-body">
                <h5 className="card-title">FORNECEDOR:</h5>
                <h6 className="card-subtitle mb-2">Registe aqui os aspetos gerais do Produto</h6>
                <form method='post'>
                    <div class='col-md-12'>
                        <label>Nome do Produto:</label>
                        <select class='form-select' name='produto' id='produtos' required >
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
                    <button id="submit" type="submit" name="submit" className="btn" onClick={handler}>Registar</button>
                </form>
            </div>
        </div>);
}
export default ProductExists;