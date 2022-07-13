/* eslint-disable no-multi-str */
import Axios from 'axios';
import { useState, Redirect } from "react";
import { useAuth0 } from '@auth0/auth0-react';

function NewProduct() {
    var url = (process.env.REACT_APP_TEST === "true") ? process.env.REACT_APP_TEST_IP : process.env.REACT_APP_DOMAIN;
    const { user, isLoading }   = useAuth0();

    const [pid, setPID]         = useState('');
    const [papel, setPapel]     = useState('');

    const [nome, setNome]                   = useState('');
    const [data, setData]                   = useState('');
    const [preco, setPreco]                 = useState('');
    const [categoria, setCategoria]         = useState('');
    const [subcategoria, setSubcategoria]   = useState('');
    const [quantidade, setQuantidade]       = useState('');
    const [armazem, setArmazem]             = useState('');
    const [catOK, setCOK]                   = useState(false);
    const [armzOK, setAOK]                  = useState(false);

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
                  setPID(response.data.results[0].id);
                }
              });
        }

        getsUser();

    const armazens = () => {
        Axios.get(url+"/api/v1/providers/storages", {
            params : {
                pid: pid
            }
        }).then((response) => {
            var store = response.data.results;
            for (var i = 0; i < store.length; i++) {
                document.getElementById("armazens").innerHTML += "<option value='" + store[i]["id"] + "'>" + store[i]["rua"] + "</option>";
            }
        });
        setAOK(true);
    }

    const categorias = () => {
        Axios.get(url+"/api/v1/gets/categorias").then((response) => {
            var cat = response.data.results;
            for (var i = 0; i < cat.length; i++) {
                document.getElementById("categorias").innerHTML += "<option value='" + cat[i]["id"] + "'>" + cat[i]["nome"] + "</option>";
            }
        });
        setCOK(true);
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
        switch(x.target.name) {
            case "nome":
                setNome(x.target.value);
                break;
            case "data":
                setData(x.target.value);
                break;
            case "preco":
                setPreco(x.target.value);
                break;
            case "categoria":
                setCategoria(x.target.value);
                break;
            case "subcategoria":
                setSubcategoria(x.target.value);
                break;
            case "quantidade":
                setQuantidade(x.target.value);
                break;
            case "armazem":
                setArmazem(x.target.value);
                break;
            case "submit":
                x.preventDefault();
                if (nome !== '' && data !== '' && preco !== '' && categoria !== '' && subcategoria !== '' && quantidade !== '' && armazem !== '') {
                    Axios.post(url+"/api/v1/providers/reg_product", {
                        prov: pid,
                        existe: false,
                        prod: nome, 
                        data: data,
                        preco: preco,
                        cat: categoria,
                        subcat: subcategoria,
                        quant: quantidade,
                        storage: armazem
                    }).then((response) => {
                        if (response.data.message === 'success') {
                            window.location.href = "http://localhost:3000/provider"; //to be changed
                        }
                    })
                }
                break;
            default:
                console.log();
        }
    }

    if (papel === 3 || papel === 4) {
        if (!catOK) {
            categorias();
        }

        if (!armzOK) {
            armazens();
        }

        return (<div className="cardForn position-absolute top-50 start-50 translate-middle pr2" id="card">
                    <div className="card-body">
                        <h5 className="card-title">FORNECEDOR:</h5>
                        <h6 className="card-subtitle mb-2">Registe aqui os aspetos gerais do Produto</h6>
                        <form method='post'>
                            <div class='col-md-12'> 
                                <label>Nome do Produto:</label> 
                                <input class='form-control' type='text' name='nome' size='50' onChange={handler} required/> 
                            </div> 
                            <div class='col-md-12'> 
                                <label>Data de Produção:</label> 
                                <input class='form-control' type='date' name='data' placeholder='DD/MM/AAAA'  size='50' onChange={handler} required/> 
                            </div> 
                            <div class='col-md-12'> 
                                <label>Preço Unitário:</label> 
                                <input class='form-control' type='number' step={.01} name='preco' size='50' onChange={handler} required/> 
                            </div> 
                            <div class='col-md-12'> 
                                <label>Categoria</label> 
                                <select class='form-select' name='categoria' id='categorias' onChange={handler} onInput={subcategorias} required> 
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
                                <input className="form-control" type="number" name="quantidade" size="50" onChange={handler} required/>
                            </div>

                            <div className="col-md-12">
                                <label>Armazém</label>
                                <select className="form-select" name="armazem" id="armazens" onChange={handler} required>
                                    <option value='' selected>Selecione um Armazém</option>
                                </select>
                            </div>
                            <button id="submit" type="submit" name="submit" className="btn btn2" onClick={handler}>Registar</button>
                        </form>
                    </div>
                </div>);
    }
    }
}
export default NewProduct;