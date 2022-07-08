/* eslint-disable no-multi-str */
import Axios from 'axios';
import { useState } from "react";
import {Link } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

var existeP = false;

function ProductRegister() {
    var url = (process.env.REACT_APP_TEST === "true") ? process.env.REACT_APP_TEST_IP : process.env.REACT_APP_DOMAIN;
    // const id = 3 //temporario

    // const [prod, setProd]                   = useState('');
    // const [nomeProd, setNomeProd]           = useState('');
    // const [dataProd, setDataProd]           = useState('');
    // const [preco, setPreco]                 = useState('');
    // const [categoria, setCategoria]         = useState('');
    // const [subcategoria, setSubcategoria]   = useState('');
    // const [quantidade, setQuantidade]       = useState('');
    // const [armazem, setArmazem]             = useState('');

    // document.body.onload = function(){go()};

    // const go = () => {
    //     armazens();
    //     categorias();
    // }

    // const prods = () => {
    //     Axios.get(url+"/api/v1/providers/products", {
    //         params: {
    //             pid: id
    //     }}).then((response) => {
    //         var prods = response.data.results;
    //         for (var i = 0; i < prods.length; i++) {
    //             document.getElementById("produtos").innerHTML += "<option value='" + prods[i]["id"] + "'>" + prods[i]["nome"] + "</option>";
    //         }
    //     });
    // }

    // const armazens = () => {
    //     Axios.get(url+"/api/v1/providers/storages", {
    //         params : {
    //             pid: id
    //         }
    //     }).then((response) => {
    //         var store = response.data.results;
    //         for (var i = 0; i < store.length; i++) {
    //             document.getElementById("armazens").innerHTML += "<option value='" + store[i]["id"] + "'>" + store[i]["rua"] + "</option>";
    //         }
    //     });
    // }

    // const categorias = () => {
    //     Axios.get(url+"/api/v1/gets/categorias").then((response) => {
    //         var cat = response.data.results;
    //         for (var i = 0; i < cat.length; i++) {
    //             document.getElementById("categorias").innerHTML += "<option value='" + cat[i]["id"] + "'>" + cat[i]["nome"] + "</option>";
    //         }
    //     });
    // }

    // const subcategorias = (x) => {
    //     Axios.get(url+"/api/v1/gets/subcategorias", {
    //         params : {
    //             cat: x
    //     }}).then((response) => {
    //         var subcat = response.data.results;
    //         for (var i = 0; i < subcat.length; i++) {
    //             document.getElementById("subcategorias").innerHTML += "<option value='" + subcat[i]["id"] + "'>" + subcat[i]["nome"] + "</option>";
    //         }
    //     });
    // }

    // const handler = (x) => {
    //     switch(x.target.name) {
    //         case "check-existe":
    //             console.log("aqui");
    //             existeP = x.checked;
    //             ProductRegister();
    //             break;
    //         default:
    //             console.log();
    //     }
    // }

    // const yes = () => {
    //     window.location.href = url+"/productExists";
    // }

    // const no = () => {
    //     window.location.href = url+"/newProduct"; 
    // }

    return (<div className="cardForn position-absolute top-50 start-50 translate-middle" id="card">
                <div className="card-body">
                    <h5 className="card-title">FORNECEDOR:</h5>
                    <h6 className="card-subtitle mb-2">Pertende fazer um registo?</h6>
                    <div className="col-md-12">
                        <label className="form-check-label" htmlFor="check-existe">O produto já existe?</label>
                        <Link to ='/productExists' ><button className="btn">Sim</button></Link>
                        <Link to ='/newProduct' ><button className="btn">Não</button></Link>
                    </div>
                </div>
            </div>);
}

export default ProductRegister;