/* eslint-disable no-multi-str */
import Axios from "axios";
import {Link } from "react-router-dom";
import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Provider () {
    const { user, isLoading }   = useAuth0();

    const [pid, setPID]         = useState('');
    const [papel, setPapel]     = useState('');
    const [encOK, setEOK]       = useState(false);
    const [prodOK, setPOK]      = useState(false);
    const [armzOK, setAOK]      = useState(false);
    var url = (process.env.REACT_APP_TEST === "true") ? process.env.REACT_APP_TEST_IP : process.env.REACT_APP_DOMAIN;

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

    
        const enc = () => {
            Axios.get(url+"/api/v1/providers/orders", {
                params: {
                    pid: pid
            }}).then ((response) => {
                if (response.data.message !== "fail") {
                    var encomendas = response.data.results;
                    for (var i = 0; i < encomendas.length; i++) {
                        document.getElementById("prov_enc").innerHTML += `<tr>\
                                                                            <td>${encomendas[i].id}</td>\
                                                                            <td>${encomendas[i].cons}</td>\
                                                                            <td>${encomendas[i].data.substring(0,10)}</td>\
                                                                            <td id="nome${encomendas[i].id}"></td>\
                                                                            <td>${encomendas[i].estado}</td>\
                                                                            <td>${encomendas[i].total}€</td>\
                                                                            <td ><a href='http://localhost:3000/order/${encomendas[i].id}' id='profile'><button type='button' class='btn btn3'>Ver</button></a></td>
                                                                        </tr>`;
                        transp(encomendas[i].transp, encomendas[i].id);
                    }
                }
            });
            setEOK(true);
        }
    
        const transp = (t, i) => {
            if (typeof t === "number") {
                Axios.get(url+'/api/v2/users/id', {
                    params: {
                        id: t
                }}).then((response) => {
                    if (response.data.message !== 'fail') {
                        document.getElementById("nome"+i).innerText = response.data.results[0].nome;
                        return;
                    }
                })
            } else {
                document.getElementById("nome"+i).innerHTML = `<a href='http://localhost:3000/selectTransp/${i}' id='profile'><button type='button' class='btn btn5'>Selecione um Transportador</button></a>`;
                return;
            }
        }

        const prod = () => {
            Axios.get(url+"/api/v1/providers/products", {
                params: {
                    pid: pid
            }}).then ((response) => {
                if (response.data.message !== "fail") {
                    var produtos = response.data.results;
                    for (var i = 0; i < produtos.length; i++) {
                        document.getElementById("prov_prod").innerHTML += "<tr>\
                                                                            <td>"+produtos[i].id+"</td>\
                                                                            <td>"+produtos[i].nome+"</td>\
                                                                            <td>"+data(produtos[i].data)+"</td>\
                                                                            <td>"+produtos[i].categoria+"</td>\
                                                                            <td>"+produtos[i].subcategoria+"</td>\
                                                                            <td>"+produtos[i].preco+"€</td>\
                                                                            <td>"+produtos[i].armazem+"</td>\
                                                                            <td>"+produtos[i].quantidade+"</td>\
                                                                        </tr>";
                    }
                }
            });
            setPOK(true);
        }
    
        const store = () => {
            Axios.get(url+"/api/v1/providers/storages", {
                params: {
                    pid: pid
            }}).then ((response) => {
                if (response.data.message !== "fail") {
                    var storages = response.data.results;
                    for (var i = 0; i < storages.length; i++) {
                        document.getElementById("prov_stor").innerHTML += "<tr>\
                                                                            <td>"+storages[i].id+"</td>\
                                                                            <td>"+storages[i].rua+"</td>\
                                                                            <td>"+cpostal(storages[i].postal1, storages[i].postal2)+"</td>\
                                                                            <td>"+storages[i].distrito+"</td>\
                                                                            <td>"+storages[i].concelho+"</td>\
                                                                        </tr>";
                    }
                }
            });
            setAOK(true);
        }
    
        const cpostal = (p1,p2) => {
            if (p1 < 1000) {
                p1 = "0"+p1;
            } else if (p1 > 9 && p1 < 100) {
                p1 = "00"+p1;
            } else if (p1 < 10) {
                p1 = "000"+p1;
            }
    
            if (p2 < 100) {
                p2 = "0"+p2;
            } else if (p2 < 10) {
                p2 = "00"+p2;
            }
        
            return p1+"-"+p2;
        }
    
        const data = (x) => {
            return x.substring(8,10)+"/"+x.substring(5,7)+"/"+x.substring(0,4);
        }

        if (papel === 3 || papel === 4) {
            const prov = () => {
                if (!encOK) {
                    enc();
                }

                if (!prodOK && encOK) {
                    prod();
                }

                if (!armzOK && encOK && prodOK) {
                    store();
                }
            }
            prov()

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
                        <Link to ='/productRegister' ><button className="btn btn2">Adicionar</button></Link>
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
                                <th>Categoria</th>
                                <th>Subcategoria</th>
                                <th>Preço</th>
                                <th>Armazém</th>
                                <th>Quantidade em Stock</th>
                            </tr>
                        </thead>
                        <tbody id="prov_prod">
                        </tbody>
                    </table>
                    </div>
        
                    <div className="container">
                        <Link to ='/storageRegister' ><button className="btn btn2">Adicionar</button></Link>
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
                </div>);
        } else {
            return (<div></div>);
        }
    }
}

export default Provider;