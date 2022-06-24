/* eslint-disable no-multi-str */
import React, { useState } from "react";
import Axios from "axios";
import $ from 'jquery';

function Register() {

    // states for registration
    const [nome, setNome]                           = useState('');
    const [email, setEmail]                         = useState('');
    const [nif, setNif]                             = useState('');
    const [telem, setTelem]                         = useState('');
    const [morada, setMorada]                       = useState('');
    const [profpic, setProfPic]                     = useState(null);
    const [password, setPassword]                   = useState('');
    const [checkPassword, setCheckPassword]         = useState('');
    const [checkConsumidor, setConsumidor]          = useState(false);
    const [checkFornecedor, setFornecedor]          = useState(false);
    const [checkTransportador, setTransportador]    = useState(false);

    const handleShow = () => {
        $("#modal_register").css("display", "block");
    }

    const handleHide = () => {
        $("#modal_register").css("display", "none");
    }
    
    const goLogin = () => {
        window.location.href = "https://ecomarket.works/login";
    }

    function check(){
        let forncheck = document.getElementById("check-fornecedor");
        let conscheck = document.getElementById("check-consumidor");
        let trancheck = document.getElementById("check-transportador");
        if(forncheck.checked || conscheck.checked){
            trancheck.disabled = true;
        } else if(trancheck.checked){
            forncheck.disabled = true;
            conscheck.disabled = true;
        } else {
            trancheck.disabled = false;
            forncheck.disabled = false;
            conscheck.disabled = false;
        }
    }

    const handler = (x) => {
        check();
        switch(x.target.name) {
            case "nome":
                setNome(x.target.value);
                break;
            case "email":
                setEmail(x.target.value);
                break;
            case "nif":
                setNif(x.target.value);
                break;
            case "telem":
                setTelem(x.target.value);
                break;
            case "profpic":
                setProfPic(x.target.files[0]);
            case "password":
                setPassword(x.target.value);
                break;
            case "checkPassword":
                setCheckPassword(x.target.value);
                break;
            case "morada":
                setMorada(x.target.value);
                break;
            case "check-consumidor":
                setConsumidor(x.target.checked);
                break;
            case "check-fornecedor":
                setFornecedor(x.target.checked);
                break;
            case "check-transportador":
                setTransportador(x.target.checked);
                break;
            case "submit":
                x.preventDefault();
                if (nome === '' || email === '' || nif === '' || 
                    telem === '' || password === '' || checkPassword === '' || morada === '' ||
                    // verificar passwords
                    (password !== checkPassword) || 
                    // garante que quando se é transportador, n pode adquirir nenhum dos outros papeis
                    (checkTransportador && (checkConsumidor || checkFornecedor))) {
                        // setError(true);
                } else {
                    Axios.post("https://ecomarket.works/api/v1/users/register", {
                        nome: nome, 
                        email: email, 
                        nif: nif, 
                        tlm: telem, 
                        morada: morada,
                        profpic: profpic,
                        pwd: password,
                        cons: checkConsumidor,
                        forn: checkFornecedor,
                        trans: checkTransportador
                    }).then((response) => {
                        console.log(response);
                        if (response.data.message === "success") {
                            document.getElementById("modal_header_register").innerText = 'Registo bem sucedido!';
                            document.getElementById("modal_body_register").innerHTML = "<p>Clique em 'Continuar' para proseguir para o início de sessão";
                            document.getElementById("continue").onclick = goLogin;
                        } else {
                            document.getElementById("modal_header_register").innerText = 'Registo Inválido';
                            document.getElementById("modal_body_register").innerHTML = "<p>A(s) razão(ões) pode(m) ser das seguintes:</p> \
                            <ul><li>Já existe uma conta com o email "+email+".</li> \
                            <li>Já existe uma conta com o NIF "+nif+".</li> \
                            <li>Já existe uma conta com o número de telemóvel "+telem+".</li></ul>";
                            // document.getElementById("modal_footer").innerHTML 
                            // = '<button type="button" onClick={handleHide} className="btn btn-secondary">Cancelar</button><button type="button" className="btn">Continuar</button>';
                        }
                        handleShow();
                    });
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
                    <h5 className="card-title">REGISTO</h5>
                    <h6 className="card-subtitle mb-2">Registe-se aqui</h6>
                    <form method="post">
                            <div className="col-md-12">
                                <label>Nome Completo</label>
                                <input className="form-control" type="text" name="nome" size="50" onChange={handler} required />
                            </div>
                            <div className="col-md-12">
                                <label>Email</label>
                                <input className="form-control" type="email" name="email" size="50" onChange={handler} required />
                            </div>
                            <div className="col-md-12">
                                <label>NIF</label>
                                <input className="form-control" type="number" name="nif" size="50" onChange={handler} required />
                            </div>
                            <div className="col-md-12">
                                <label>Morada</label>
                                <input className="form-control" type="text" name="morada" size="50" onChange={handler} required />
                            </div>
                            <div className="col-md-12">
                                <label>Número de Telemóvel</label>
                                <input className="form-control" type="number" name="telem" size="50" onChange={handler} required />
                            </div>
                            <div className="col-md-12">
                                <label>Foto de Perfil</label>
                                <input className="form-control" type="file" name="profpic" size="50" onChange={handler} />
                            </div>
                            <div className="col-md-12">
                                <label>Password</label>
                                <input className="form-control" type="password" name="password"size="50" onChange={handler} required />
                            </div>
                            <div className="col-md-12">
                                <label>Confirme a Password</label>
                                <input className="form-control" type="password" name="checkPassword" size="50" onChange={handler} required />
                            </div>
                            <div className="col-md-12">
                                <div className="form-check">
                                     <input className="form-check-input" type="checkbox" id="check-consumidor" name="check-consumidor" onChange={handler} />
                                     <label className="form-check-label" htmlFor="check-consumidor">Consumidor</label>
                                     <br />
                                     <input className="form-check-input" type="checkbox" id="check-fornecedor" name="check-fornecedor" onChange={handler} />
                                     <label className="form-check-label" htmlFor="check-fornecedor">Fornecedor</label>
                                     <br />
                                     <input className="form-check-input" type="checkbox" id="check-transportador" name="check-transportador" onChange={handler} />
                                     <label className="form-check-label" htmlFor="check-transportador">Transportador</label>
                                </div>
                            </div>
                            
                             <button id="submit" type="submit" name="submit" className="btn" onClick={handler}>Registar</button>
                         </form>
                </div>
            </div>

            {/* MODAL */}
             <div className="modal fade" id="modal_register" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                 <div className="modal-dialog modal-dialog-centered">
                     <div className="modal-content">
                         <div className="modal-header" id="modal_header_register">~
                             <button type="button" class="btn-close" aria-label="Close"></button>
                         </div>
                         <div className="modal-body" id="modal_body_register">
                         </div>
                         <div className="modal-footer" id="modal_footer_register">
                         <button className="btn" type="button" onClick={handleHide} id="continue">OK</button>
                         </div>
                     </div>
                 </div>
             </div>
        </div>
    );
}

export default Register;