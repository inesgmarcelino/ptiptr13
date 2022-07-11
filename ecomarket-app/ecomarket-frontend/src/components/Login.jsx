import React, { useState } from "react";
import Axios from "axios";
import $ from "jquery";
import { useAuth0 } from '@auth0/auth0-react';


function Login() {
    // states for login
    const [email, setEmail]         = useState('');
    const [password, setPassword]   = useState('');

    const handleShow = () => {
        $("#modal_login").css("display", "block");
    }

    const handleHide = () => {
        $("#modal_login").css("display", "none")
    }

    const goHome = () => {
        var url = (process.env.REACT_APP_TEST === "true") ? process.env.REACT_APP_TEST_IP : process.env.REACT_APP_DOMAIN;
        window.location.href = url;
    }

    const handler = (x) => {
        switch(x.target.name) {
            case "email":
                setEmail(x.target.value);
                break;
            case "password":
                setPassword(x.target.value);
                break;
            case "submit":
                x.preventDefault();
                if ( email === '' || password === '') {
                        // setError(true);
                } else {
                    var url = (process.env.REACT_APP_TEST === "true") ? process.env.REACT_APP_TEST_IP : process.env.REACT_APP_DOMAIN;
                    Axios.post(url+"/api/v1/users/login", {
                        email: email,
                        pwd: password
                    }).then((response) => {
                        if (response.data.message === "success") {
                            goHome();
                        } else {
                             if (response.data.message === "no email") {
                            document.getElementById("modal_header_login").innerText = 'Início de Sessão Inválido';
                            document.getElementById("modal_body_login").innerText = 'Não há nenhuma conta registada com o email '+email;
                            } else {
                                document.getElementById("modal_header_login").innerText = 'Início de Sessão Inválido';
                                document.getElementById("modal_body_login").innerText = 'Email e/ou password incorreto(s)';
                            }
                            handleShow();
                        }
                    })
                }
                break;
            default:
                console.log();
        }
    }

    return (
        <div>
            <div className="card position-absolute top-50 start-50 translate-middle">
                <div className="card-body">
                    <h5 className="card-title">LOGIN</h5>
                    <h6 className="card-subtitle mb-2">Inicie aqui a Sessão</h6>
                    <form method="get">
                        <div className="col-md-12">
                            <label>Email</label>
                            <input className="form-control" type="email" name="email" size="50" onChange={handler} required />
                        </div>
                        <div className="col-md-12">
                            <label>Password</label>
                            <input className="form-control" type="password" name="password" size="50"  onChange={handler} required />
                        </div>
                    
                        <button id="submit" type="submit" name="submit" className="btn btn2" onClick={handler}>Iniciar Sessão</button>
                    </form>
                </div>
            </div>

            {/* MODAL*/ }
             <div className="modal fade" id="modal_login" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                 <div className="modal-dialog modal-dialog-centered">
                     <div className="modal-content">
                         <div className="modal-header" id="modal_header_login">~
                             <button type="button" className="btn-close" aria-label="Close"></button>
                         </div>
                         <div className="modal-body" id="modal_body_login">
                         </div>
                         <div className="modal-footer" id="modal_footer_login">
                         <button type="button" onClick={handleHide} className="btn" id="cancelar">Cancelar</button>
                         </div>
                     </div>
                 </div>
             </div>
        </div>
    );
}

export default Login;