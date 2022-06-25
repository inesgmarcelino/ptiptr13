import React, { useState } from "react";
import Axios from "axios";
import $ from "jquery";

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
        window.location.href = "http://localhost:3000/";
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
                    Axios.post("http://localhost:3001/api/login", {
                        email: email,
                        pwd: password
                    }).then((response) => {
                        console.log(response);
                        if (response.data === "success") {
                            goHome();
                        } else {
                             if (response.data === "no email") {
                            document.getElementById("modal_header_login").innerText = 'Início de Sessão Inválido';
                            document.getElementById("modal_body_login").innerText = 'Não há nenuma conta registada com o email '+email;
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
        // <div className="col-8 justify-content-center mt-5">
        //     <div className="form-holder">
        //         <div className="form-content position-absolute">
        //             <div className="form-items">
        //                 <h3>LOGIN</h3>
        //                 <p>Inicie sessão aqui.</p>

        //                 <form method="get">
        //                     <div className="col-md-12">
        //                         <input className="form-control" type="email" name="email" placeholder="Email" onChange={handler} required />
        //                     </div>
        //                     <div className="col-md-12">
        //                         <input className="form-control" type="password" name="password" placeholder="Password" onChange={handler} required />
        //                     </div>
                            
        //                     <button id="submit" type="submit" name="submit" className="btn" onClick={handler}>Iniciar Sessão</button>
        //                 </form>
        //             </div>
        //         </div>
        //     </div>
        //     {/* MODAL */}
        //     <div className="modal fade" id="modal_login" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        //         <div className="modal-dialog modal-dialog-centered">
        //             <div className="modal-content">
        //                 <div className="modal-header" id="modal_header_login">~
        //                     <button type="button" className="btn-close" aria-label="Close"></button>
        //                 </div>
        //                 <div className="modal-body" id="modal_body_login">
        //                 </div>
        //                 <div className="modal-footer" id="modal_footer_login">
        //                 <button type="button" onClick={handleHide} className="btn" id="cancelar">Cancelar</button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div>
            <div className="card position-absolute top-50 start-50 translate-middle">
                <div className="card-body">
                    <h5 className="card-title">LOGIN</h5>
                    <h6 className="card-subtitle mb-2">Inicie aqui a Sessão</h6>
                    <form method="get">
                        <div className="col-md-12">
                            <input className="form-control" type="email" name="email" placeholder="Email" onChange={handler} required />
                        </div>
                        <div className="col-md-12">
                            <input className="form-control" type="password" name="password" placeholder="Password" onChange={handler} required />
                        </div>
                    
                        <button id="submit" type="submit" name="submit" className="btn" onClick={handler}>Iniciar Sessão</button>
                    </form>
                </div>
            </div>

            {/* MODAL */}
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