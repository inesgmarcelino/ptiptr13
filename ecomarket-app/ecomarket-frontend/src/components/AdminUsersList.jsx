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
                                                                        <th>"+c[i].id+"</th>\
                                                                        <th>"+c[i].nome+"</th>\
                                                                        <th>"+c[i].email+"</th>\
                                                                        <th>"+c[i].nif+"</th>\
                                                                        <th>"+c[i].morada+"</th>\
                                                                        <th>"+c[i].telemovel+"</th>\
                                                                        <th> Botão para o editprofile.jsx respetivo</th>\
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
                                                                        <th>"+p[i].id+"</th>\
                                                                        <th>"+p[i].nome+"</th>\
                                                                        <th>"+p[i].email+"</th>\
                                                                        <th>"+p[i].nif+"</th>\
                                                                        <th>"+p[i].morada+"</th>\
                                                                        <th>"+p[i].telemovel+"</th>\
                                                                        <th> Botão para o editprofile.jsx respetivo</th>\
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
                                                                        <th>"+t[i].id+"</th>\
                                                                        <th>"+t[i].nome+"</th>\
                                                                        <th>"+t[i].email+"</th>\
                                                                        <th>"+t[i].nif+"</th>\
                                                                        <th>"+t[i].morada+"</th>\
                                                                        <th>"+t[i].telemovel+"</th>\
                                                                        <th> Botão para o editprofile.jsx respetivo</th>\
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