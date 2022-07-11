/* eslint-disable no-multi-str */
import React, { useState } from 'react';
import Axios from "axios";
import {Link } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

function AdminUsersList(){
    const { user, isLoading }   = useAuth0();
    const [id, setID]           = useState();
    const [papel, setPapel]     = useState();
    const [consOK, setCOK]      = useState(false);
    const [fornOK, setFOK]      = useState(false);
    const [transOK, setTOK]     = useState(false);
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
                    setPapel(response.data.results[0].papel);
                    setID(response.data.results[0].id);
                }
                });
        }

        getsUser();

        const cons = () => {
            Axios.get(url+"/api/v2/admin/cons").then ((response) => {
                document.getElementById("admin_users").innerHTML += "<tr> \
                                                                        <td colspan='7'>Consumidores</td> \
                                                                    </tr>";
                if (response.data.message !== "fail") {
                    var c = response.data.results;
                    for (var i = 0; i < c.length; i++) {
                        document.getElementById("admin_users").innerHTML += "<tr>\
                                                                            <td>"+c[i].id+"</td>\
                                                                            <td>"+c[i].nome+"</td>\
                                                                            <td>"+c[i].email+"</td>\
                                                                            <td>"+c[i].nif+"</td>\
                                                                            <td>"+c[i].phone+"</td>\
                                                                            <td> Botão para o editprofile.jsx respetivo</td>\
                                                                        </tr>";
                    }
                    
                }
            });
            setCOK(true);
        }

        const prov = () => {
            if (consOK && !transOK) {
                Axios.get(url+"/api/v2/admin/prov").then ((response) => {
                    document.getElementById("admin_users").innerHTML += "<tr> \
                                                                            <td colspan='7'>Fornecedores</td> \
                                                                        </tr>";
                    if (response.data.message !== "fail") {
                        var p = response.data.results;
                        for (var i = 0; i < p.length; i++) {
                            document.getElementById("admin_users").innerHTML += "<tr>\
                                                                                <td>"+p[i].id+"</td>\
                                                                                <td>"+p[i].nome+"</td>\
                                                                                <td>"+p[i].email+"</td>\
                                                                                <td>"+p[i].nif+"</td>\
                                                                                <td>"+p[i].phone+"</td>\
                                                                                <td> Botão para o editprofile.jsx respetivo</td>\
                                                                            </tr>";
                        }
                    }
                });
                setFOK(true);
            }
        }

        const trans = () => {
            if (consOK && fornOK) {
                 Axios.get(url+"/api/v2/admin/transp").then ((response) => {
                    document.getElementById("admin_users").innerHTML += "<tr> \
                                                                            <td colspan='7'>Transportadores</td> \
                                                                        </tr>";
                    if (response.data.message !== "fail") {
                        var t = response.data.results;
                        for (var i = 0; i < t.length; i++) {
                            document.getElementById("admin_users").innerHTML += "<tr>\
                                                                                <td>"+t[i].id+"</td>\
                                                                                <td>"+t[i].nome+"</td>\
                                                                                <td>"+t[i].email+"</td>\
                                                                                <td>"+t[i].nif+"</td>\
                                                                                <td>"+t[i].phone+"</td>\
                                                                                <td> Botão para o editprofile.jsx respetivo</td>\
                                                                            </tr>";
                        }
                    }
                });
                setTOK(true);
            }
        }

        if (papel === 1) {
            const users = () => {
                if (!consOK) {
                    cons();
                }

                if (!fornOK && consOK) {
                    prov();
                }
        
                if (!transOK && consOK && fornOK) {
                    trans();
                }
            }
            users();

            return (<div className="position-absolute showItems">
                        <div className="container">
                            <h3>Utilizadores</h3>     
                        </div>
                        <br />
                        <div className="container">
                        <table className="table table-bordered" id='centrar'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>NIF</th>
                                    <th>Contacto</th>
                                    <th>-- --</th>
                                </tr>
                            </thead>
                            <tbody id="admin_users">
                            </tbody>
                        </table>
                        </div>
                    </div>);

        } else {
            return (<div></div>);
        }
    }
}

export default AdminUsersList;