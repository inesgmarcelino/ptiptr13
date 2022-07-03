/* eslint-disable no-multi-str */
import Axios from 'axios';
import { useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { getOverlayDirection } from 'react-bootstrap/esm/helpers';

function ProductRegister(){
    const { user } = useAuth0();
    const id = 3; //testar forn
    

    const [nomeProd, setNomeProd]           = useState('');
    const [dataProd, setDataProd]           = useState('');
    const [preco, setPreco]                 = useState('');
    const [categoria, setCategoria]         = useState('');
    const [subcategoria, setSubcategoria]   = useState('');
    const [quantidade, setQuantidade]       = useState('');
    const [armazem, setArmazem]             = useState('');

    document.body.onload = function(){go()};

    const go = () => {
        categorias();
        armazens();
    }

    const armazens = () => {
        var url = (process.env.REACT_APP_TEST === "true") ? process.env.REACT_APP_TEST_IP : process.env.REACT_APP_DOMAIN;
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
        var url = (process.env.REACT_APP_TEST === "true") ? process.env.REACT_APP_TEST_IP : process.env.REACT_APP_DOMAIN;
        Axios.get(url+"/api/v1/gets/categorias").then((response) => {
            var cat = response.data.results;
            for (var i = 0; i < cat.length; i++) {
                document.getElementById("categorias").innerHTML += "<option value='" + cat[i]["id"] + "'>" + cat[i]["nome"] + "</option>";
            }
        });
    }

    const subcategorias = (x) => {
        var url = (process.env.REACT_APP_TEST === "true") ? process.env.REACT_APP_TEST_IP : process.env.REACT_APP_DOMAIN;
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
        var url = (process.env.REACT_APP_TEST === "true") ? process.env.REACT_APP_TEST_IP : process.env.REACT_APP_DOMAIN;
        switch(x.target.name) {
            case "nomeProd":
                setNomeProd(x.target.value);
                break;
            case "dataProd":
                setDataProd(x.target.value);
                break;
            case "preco":
                setPreco(x.target.value);
                break;
            case "quantidade":
                setQuantidade(x.target.value);
                break;
            case "armazem":
                setArmazem(x.target.value);
                break;
            case "categoria":
                setCategoria(x.target.value);
                break;
            case "subcategoria":
                setSubcategoria(x.target.value);
                break;
            case "submit":
                x.preventDefault();
                if (nomeProd === '' || dataProd === '' || preco === '' || quantidade === '' || armazem === '' || categoria === '' || subcategoria === '') {
                    console.log('amiga falta algo')
                } else {
                    Axios.post(url+"/api/v1/providers/reg_product", {
                        prov: id,
                        nome: nomeProd,
                        data: dataProd,
                        preco: preco,
                        quant: quantidade,
                        storage: armazem,
                        cat: categoria,
                        subcat: subcategoria
                    }).then((response) => {
                        console.log(response);
                        if (response.data.message === "success") {
                            window.location.href = "http://localhost:3000/provider"; //yo be changed
                        }
                    })
                }
                break;
            default:
                console.log();
        }
    }

    return(
        <div>
        <div className="cardForn position-absolute top-50 start-50 translate-middle">
            <div className="card-body">
                <h5 className="card-title">FORNECEDOR:</h5>
                <h6 className="card-subtitle mb-2">Registe aqui os aspetos gerais do Produto</h6>
                <form method='post'>
                    <div className="col-md-12">
                        <label>Nome do Produto:</label>
                        <input className="form-control" type="text" name="nomeProd"  size="50" onChange={handler} required/>
                    </div>
                    <div className="col-md-12">
                        <label>Data de Produção:</label>
                        <input className="form-control" type="date" name="dataProd" placeholder="DD/MM/AAAA"  size="50" onChange={handler} required/>
                    </div>
                        
                    <div className="col-md-12">
                        <label>Preço Unitário:</label>
                        <input className="form-control" type="number" step={.01} name="preco"  size="50" onChange={handler} required/>
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

                    <div className="col-md-12">
                        <label>Categoria</label>
                        <select className="form-select" name="categoria" id="categorias" onChange={handler} onInput={subcategorias} required>
                            <option value='' selected>Selecione uma Categoria</option>
                        </select>
                    </div>

                    <div className="col-md-12">
                        <label>Subcategoria</label>
                        <select className="form-select" name="subcategoria" id="subcategorias" onChange={handler} required>
                            <option value='' selected>Selecione uma Subcategoria</option>
                        </select>
                    </div>
                         
                    <button id="submit" type="submit" name="submit" className="btn" onClick={handler}>Registar</button>
                </form>
            </div>
        </div> 
        </div>
    );
}

export default ProductRegister;
