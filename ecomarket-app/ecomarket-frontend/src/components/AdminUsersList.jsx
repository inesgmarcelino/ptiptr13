/* eslint-disable no-multi-str */
import React from 'react';
import Axios from "axios";
import {Link } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

function AdminUsersList(){
    document.body.onload = function(){users()};

    const users = () => {
        Axios.get("https://ecomarket.works/api/v1/admin/cons").then ((response) => {
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
                                                                        <td>"+c[i].morada+"</td>\
                                                                        <td>"+c[i].telemovel+"</td>\
                                                                        <td> Botão para o editprofile.jsx respetivo</td>\
                                                                    </tr>";
                }
            }
        });

        Axios.get("https://ecomarket.works/api/v1/admin/prov").then ((response) => {
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
                                                                        <td>"+p[i].morada+"</td>\
                                                                        <td>"+p[i].telemovel+"</td>\
                                                                        <td> Botão para o editprofile.jsx respetivo</td>\
                                                                    </tr>";
                }
            }
        });

        Axios.get("https://ecomarket.works/api/v1/admin/transp").then ((response) => {
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
                                                                        <td>"+t[i].morada+"</td>\
                                                                        <td>"+t[i].telemovel+"</td>\
                                                                        <td> Botão para o editprofile.jsx respetivo</td>\
                                                                    </tr>";
                }
            }
        });
    }
    return(
        <div className="position-absolute showItems">
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
                        <th>Morada</th>
                        <th>Contacto</th>
                        <th>-- --</th>
                    </tr>
                </thead>
                <tbody id="admin_users">
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default AdminUsersList;