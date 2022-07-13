/* eslint-disable no-multi-str */
import Axios from "axios";
import {Link } from "react-router-dom";
import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from "react-router-dom";

function SelectTransp () {
    const { user, isLoading }   = useAuth0();
    let { id }                  = useParams();
    const [pid, setPID]         = useState('');
    const [papel, setPapel]     = useState('');
    const [trpOK, setTOK]      = useState(false);
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

        const transps = () => {
            Axios.get(url+"/api/v2/admin/transp").then ((response) => {
                if (response.data.message !== "fail") {
                    var transportadores = response.data.results;
                    for (var i = 0; i < transportadores.length; i++) {
                        document.getElementById("transps").innerHTML += `<tr>\
                                                                            <td>${transportadores[i].id}</td>\
                                                                            <td>${transportadores[i].nome}</td>\
                                                                            <td><a href='${url}/api/v1/providers/add_transp?id=${id}&transp=${transportadores[i].id}' id='profile'><button type='button' class='btn btn3'>Selecionar</button></a></td>\
                                                                        </tr>`;
                    }
                }
            });
            setTOK(true);
        }

        if (papel === 3 || papel === 4) {

            if (!trpOK) {
                transps();
            }

            return(<div className="position-absolute showItems">
                        <div className="container">
                            <h3>Escolha uma Transportadora</h3>     
                        </div>
                        <br />
                        <div className="container">
                        <table className="table table-bordered" id='centrar'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>-- --</th>
                                </tr>
                            </thead>
                            <tbody id="transps">
                            </tbody>
                        </table>
                        </div>
                    </div>);
        }
    }
}


export default SelectTransp;