/* eslint-disable no-multi-str */
import React, { useState } from 'react';
import Axios from "axios";
import {Link } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

function Consumer () {
    const { user, isLoading }   = useAuth0();

    const [cid, setCID]         = useState('');
    const [papel, setPapel]     = useState('');
    const [encOK, setEOK]       = useState(false);
    var url = (process.env.REACT_APP_TEST === "true") ? process.env.REACT_APP_TEST_IP : process.env.REACT_APP_DOMAIN;

    if(isLoading) {
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

        const enc = () => {
            Axios.get(url+"/api/v1/consumers/orders", {
                params: {
                    cid: cid
            }}).then ((response) => {
                if (response.data.message !== "fail") {
                    var encomendas = response.data.results;
                    for (var i = 0; i < encomendas.length; i++) {
                        document.getElementById("linhas").innerHTML += `<tr>\
                                                                            <td>${encomendas[i].id}</td>\
                                                                            <td>${encomendas[i].data.substring(0,10)}</td>\
                                                                            <td>${encomendas[i].fornecedor}</td>\
                                                                            <td>${transp(4)}</td>\
                                                                            <td>${encomendas[i].estado}</td>\
                                                                            <td>${encomendas[i].total}€</td>\
                                                                            <td class=''><a href='http://localhost:3000/order/${encomendas[i].id}' id='profile'><button type='button' class='btn btn3'>Ver</button></a></td>
                                                                        </tr>`;
                    }
                }
            });
            setEOK(true);
        }
    // <button value="x" onClick={buscarenc}
    
        const transp = (x) => {
            if (x !== null) {
                let nome = '';
                Axios.get(url+"/api/v2/users/id", {
                    params: {
                        id: x
                }}).then((response) => {
                    return response.data.results[0].nome; //to be fixed
                });
            } else {
                return "Por atribuir pelo Fornecedor";
            }
        }

        if (papel === 2 || papel === 4) {
            // const buscarEnc = (x) => {
            //     var url = (process.env.REACT_APP_TEST === "true") ? process.env.REACT_APP_TEST_IP : process.env.REACT_APP_DOMAIN;
            //     window.location.href = url+'/order?id=' + x.target.value;   
            // }
            
            const cons = () => {
                if (!encOK) {
                    enc();
                }
            }
            cons();


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

