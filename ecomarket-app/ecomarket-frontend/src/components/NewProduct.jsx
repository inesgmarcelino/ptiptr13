/* eslint-disable no-multi-str */
import Axios from 'axios';
import { useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';

function NewProduct() {
    var url = (process.env.REACT_APP_TEST === "true") ? process.env.REACT_APP_TEST_IP : process.env.REACT_APP_DOMAIN;
    const id = 3 //temporario

    document.body.onload = function(){go()};

    const go = () => {
        armazens();
        categorias();
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

    const categorias = () => {
        Axios.get(url+"/api/v1/gets/categorias").then((response) => {
            var cat = response.data.results;
            for (var i = 0; i < cat.length; i++) {
                document.getElementById("categorias").innerHTML += "<option value='" + cat[i]["id"] + "'>" + cat[i]["nome"] + "</option>";
            }
        });
    }

    const subcategorias = (x) => {
        Axios.get(url+"/api/v1/gets/subcategorias", {
            params : {
                cat: x.target.value
        }}).then((response) => {
            var subcat = response.data.results;
            for (var i = 0; i < subcat.length; i++) {
                document.getElementById("subcategorias").innerHTML += "<option value='" + subcat[i]["id"] + "'>" + subcat[i]["nome"] + "</option>";
            }
        });
    }

    const handler = (x) => {

    }

    return (
        <div className="cardForn position-absolute top-50 start-50 translate-middle pr2" id="card">
            <div className="card-body">
                <h5 className="card-title">FORNECEDOR:</h5>
                <h6 className="card-subtitle mb-2">Registe aqui os aspetos gerais do Produto</h6>
                <form method='post'>
                    <div class='col-md-12'> 
                        <label>Nome do Produto:</label> 
                        <input class='form-control' type='text' name='nomeProd' id='nomeProd' size='50' required/> 
                    </div> 
                    <div class='col-md-12'> 
                        <label>Data de Produção:</label> 
                        <input class='form-control' type='date' name='dataProd' id ='dataProd' placeholder='DD/MM/AAAA'  size='50' required/> 
                    </div> 
                    <div class='col-md-12'> 
                        <label>Preço Unitário:</label> 
                        <input class='form-control' type='number' step={.01} name='preco' id='preco' size='50'  required/> 
                    </div> 
                    <div class='col-md-12'> 
                        <label>Categoria</label> 
                        <select class='form-select' name='categoria' id='categorias' onInput={subcategorias} required> 
                            <option value='' selected>Selecione uma Categoria</option> 
                        </select> 
                    </div> 
                    <div class='col-md-12'> 
                        <label>Subcategoria</label> 
                        <select class='form-select' name='subcategoria' id='subcategorias' onChange={handler} required> 
                            <option value='' selected>Selecione uma Subcategoria</option> 
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
export default NewProduct;