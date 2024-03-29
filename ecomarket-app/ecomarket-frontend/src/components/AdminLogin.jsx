import React, { useState } from "react";
import Axios from "axios";
import $ from "jquery";

function AdminLogin() {

    // states for login
    const [email, setEmail]         = useState('');
    const [password, setPassword]   = useState('');

    const handleShow = () => {
        $("#modal_admin").css("display", "block");
    }

    const handleHide = () => {
        $("#modal_admin").css("display", "none")
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
                    Axios.post(url+"/api/v1/admin/adminLogin", {
                        email: email,
                        pwd: password
                    }).then((response) => {
                        if (response.data.message === "success") {
                            goHome();
                        } else {
                             if (response.data.message === "no email") {
                            document.getElementById("modal_body_login").innerText = 'Email do Administrador incorreto: '+email;
                            } else {
                                document.getElementById("modal_body_admin").innerText = 'Password incorreto.';
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

    return(
        <div>
            <div className="card position-absolute top-50 start-50 translate-middle">
                <div className="card-body">
                    <h5 className="card-title">Admin - Login</h5>
                    <h6 className="card-subtitle mb-2">Inicie aqui a Sessão</h6>
                    <form method="get">
                        <div className="col-md-12">
                            <input className="form-control" type="email" name="email" placeholder="Email" onChange={handler} required />
                        </div>
                        <div className="col-md-12">
                            <input className="form-control" type="password" name="password" placeholder="Password" onChange={handler} required />
                        </div>
                    
                        <button id="submit" type="submit" name="submit" className="btn btn2" onClick={handler}>Iniciar Sessão</button>
                    </form>
                </div>
            </div>

            {/* MODAL */}
             <div className="modal fade" id="modal_admin" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                 <div className="modal-dialog modal-dialog-centered">
                     <div className="modal-content">
                         <div className="modal-header" id="modal_header_admin">
                             Administrador Inválido
                         </div>
                         <div className="modal-body" id="modal_body_admin">
                         </div>
                         <div className="modal-footer" id="modal_footer_admin">
                         <button type="button" onClick={handleHide} className="btn" id="cancelar">Cancelar</button>
                         </div>
                     </div>
                 </div>
             </div>
        </div>
    );  
}

export default AdminLogin;
