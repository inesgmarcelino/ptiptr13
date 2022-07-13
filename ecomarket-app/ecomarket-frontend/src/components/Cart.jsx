/* eslint-disable no-multi-str */
import $ from "jquery";
import Axios from "axios";
import React, { useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
const img3 = require('../images/plus.png')
const img4 = require('../images/less.png')



function Cart() {
    const { user, isLoading }   = useAuth0();

    const [cid, setCID]         = useState('');
    const [papel, setPapel]     = useState('');
    const [prodOK, setPOK]      = useState(false);
    var url = (process.env.REACT_APP_TEST === "true") ? process.env.REACT_APP_TEST_IP : process.env.REACT_APP_DOMAIN;

    const minus = () => {
        var count = $("#qtty").val();
        if (count > 0) {
            count--;
            $("#qtty").val(count);
        }
    }

    const plus = () => {
        var count = $("#qtty").val();
        count++;
        $("#qtty").val(count);
    }

    const prod = () => {
        Axios.get(url+"/api/v1/carriers", {
            params: {
                cons: cid
        }}).then ((response) => {
            if (response.data.message !== "fail") {
                var produtos = response.data.results;
                for (var i = 0; i < produtos.length; i++) {
                    document.getElementById("linhas").innerHTML += `<tr>\
                                                                        <td class='cart'>${produtos[i].nome}</td>\
                                                                        <td class='cart'>${produtos[i].quantidade}</td>\
                                                                        <td class='cart'>${produtos[i].preco}€</td>\
                                                                        <td class='cart'><a href='${url}/api/v1/carriers/delete/prod?cons=${cid}&prod=${produtos[i].id}' id='profile'><button type='button' id="remover" value="${produtos[i].id}" class='btn btn5'>Remover</button></a></td>\
                                                                    </tr>`;
                }
            }
        });
        setPOK(true);
    }

    // document.getElementById("remover").addEventListener('click', () => {
    //     Axios.delete(url+'/carriers/delete/prod', {
    //         cons: cid,
    //         prod: document.getElementById("remover").value
    //     }).then((response) => {
    //         if (response.data.message === 'success') {
    //             window.location = '/cart';
    //         }
    //     })
    // });

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
                  setCID(response.data.results[0].id);
                }
              });
        }

        getsUser();
        
        if (papel === 2 || papel === 4) {

            if (!prodOK) {
                prod();
            }

            return (<div>
                        <div className="container">
                            <p className="titulo">Carrinho de Compras</p>
                            <div className="shopping-cart">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="cart">Produto</th>
                                            <th className="cart">Quantidade</th>
                                            <th className="cart">Preço</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody id ="linhas">
                                    </tbody>
                                </table>
                                
                            </div>
                            <div className="sumprice">Preço total: </div>
                            <button name="encomendar" className="btn btn2" >Encomendar</button>
                        </div>
                    </div>);
        }
    }
}

export default Cart;