/* eslint-disable no-multi-str */
import React, { useState } from 'react';
import Axios from "axios";
import {Link } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

function Consumer () {
    const { user, isLoading }   = useAuth0();

    const [cid, setCID]         = useState('');
    const [papel, setPapel]     = useState('');
    var url = (process.env.REACT_APP_TEST === "true") ? process.env.REACT_APP_TEST_IP : process.env.REACT_APP_DOMAIN;

    if (!isLoading) {

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
            // const buscarEnc = (x) => {
            //     var url = (process.env.REACT_APP_TEST === "true") ? process.env.REACT_APP_TEST_IP : process.env.REACT_APP_DOMAIN;
            //     window.location.href = url+'/order?id=' + x.target.value;   
            // }
        
            const enc = () => {
                Axios.get(url+"/api/v1/consumers/orders", {
                    params: {
                        cid: cid
                }}).then ((response) => {
                    if (response.data.message !== "fail") {
                        var encomendas = response.data.results;
                        for (var i = 0; i < encomendas.length; i++) {
                            document.getElementById("linhas").innerHTML += "<tr>\
                                                                                <td>"+encomendas[i].id+"</td>\
                                                                                <td>"+encomendas[i].data.substring(0,10)+"</td>\
                                                                                <td>"+encomendas[i].fornecedor+"</td>\
                                                                                <td>"+encomendas[i].transportador+"</td>\
                                                                                <td>"+status(encomendas[i].cons, encomendas[i].forn, encomendas[i].transp)+"</td>\
                                                                                <td>"+encomendas[i].total+"€</td>\
                                                                                <td><button value='"+encomendas[i].id+"'>Ver</button></td>\
                                                                            </tr>";
                        }
                    }
                });
            }
        // <button value="x" onClick={buscarenc}
        
            const status = (c,f,t) => {
                if (c === 'YES') {
                    if (f === 'NO') {
                        return "A aguardar pela confirmação do Fornecedor";
                    } else if (t === 'NO') {
                        return "Em trânsito";
                    } else {
                        return "Entregue";
                    }
                } else {
                    return "A aguardar o pagamento";
                }
            }

            enc();

            return(
                <div className="position-absolute showItems">
                    <div className="container">
                        <h3>As minhas encomendas</h3>     
                    </div>
                    <br />
                    <div className="container">
                    <table className="table table-bordered" id='centrar'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Data</th>
                                <th>Fornecedor</th>
                                <th>Transportador</th>
                                <th>Estado</th>
                                <th>Valor Total</th>
                                <th>-- --</th> {/* botão */}
                            </tr>
                        </thead>
                        <tbody id ="linhas">
                        </tbody>
                    </table>
                    </div>
                </div>
            );
        } else {
            return (<div></div>);
        }
        
    }
}

export default Consumer;

