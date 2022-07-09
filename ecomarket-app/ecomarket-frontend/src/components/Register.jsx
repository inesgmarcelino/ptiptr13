/* eslint-disable no-multi-str */
import React, { useState } from "react";
import Axios from "axios";
import $ from 'jquery';
import { useAuth0 } from '@auth0/auth0-react';

function Register() {
    var url = (process.env.REACT_APP_TEST === "true") ? process.env.REACT_APP_TEST_IP : process.env.REACT_APP_DOMAIN;
    const { loginWithRedirect} = useAuth0();

    // states for registration
    const [nome, setNome]                           = useState('');
    const [email, setEmail]                         = useState('');
    const [nif, setNif]                             = useState('');
    const [telem, setTelem]                         = useState('');
    const [rua, setRua]                             = useState('');
    const [dist, setDist]                           = useState('');
    const [conc, setConc]                           = useState('');
    const [prefix, setPrefix]                       = useState('');
    const [sufix, setSufix]                         = useState('');
    const [password, setPassword]                   = useState('');
    const [checkPassword, setCheckPassword]         = useState('');
    const [checkConsumidor, setConsumidor]          = useState(false);
    const [checkFornecedor, setFornecedor]          = useState(false);
    const [checkTransportador, setTransportador]    = useState(false);
    const [papel, setPapel]                         = useState('');

    const handleShow = () => {
        $("#modal_register").css("display", "block");
    }

    function handleHide(){
        $("#modal_register").css("display", "none");
    }

    document.body.onload = function(){distritos()};

    const distritos = () => {
        Axios.get(url+"/api/v1/gets/distritos").then((response) => {
            var dist = response.data.results;
            for (var i = 0; i < dist.length; i++) {
                document.getElementById("distritos").innerHTML += "<option value='" + dist[i]["id"] + "'>" + dist[i]["nome"] + "</option>";
            }
        });
    }

    const concelhos = (x) => {
        document.getElementById("concelhos").innerHTML = "<option value='' selected>Selecione um Concelho</option>";
        Axios.get(url+"/api/v1/gets/concelhos", { 
            params: { 
                dist: x.target.value
        }}).then((response) => {
            var conc = response.data.results;
            for (var i = 0; i < conc.length; i++) {
                document.getElementById("concelhos").innerHTML += "<option value='" + conc[i]["id"] + "'>" + conc[i]["nome"] + "</option>";
            }
        });
    }
    
    const goLogin = () => {
        window.location.href = url;
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
                console.log(nome);
                break;
            case "email":
                setEmail(x.target.value);
                console.log(email);
                break;
            case "nif":
                if (nif.length < 9 || x.target.value.length < 9) {
                    setNif(x.target.value.replace(/[^0-9]/gi, ''));
                }
                console.log(nif);
                break;
            case "telem":
                if (telem.length < 9 || x.target.value.length < 9) {
                    setTelem(x.target.value.replace(/[^0-9]/gi, ''));
                }
                console.log(telem);
                break;
            case "rua":
                setRua(x.target.value);
                console.log(rua);
                break;
            case "distrito":
                setDist(x.target.value);
                console.log(dist);
                break;
            case "concelho":
                setConc(x.target.value);
                console.log(conc);
                break;
            case "prefix":
                if (prefix.length < 4 || x.target.value.length < 4) {
                    setPrefix(x.target.value.replace(/[^0-9]/gi, ''));
                }
                console.log(prefix);
                break;
            case "sufix":
                if (sufix.length < 3 || x.target.value.length < 3) {
                    setSufix(x.target.value.replace(/[^0-9]/gi, ''));
                }
                console.log(sufix);
                break;
            case "password":
                setPassword(x.target.value);
                break;
            case "checkPassword":
                setCheckPassword(x.target.value);
                break;
            case "check-consumidor":
                if (papel === 3) {
                    setPapel(4)
                } else {
                    setPapel(2);
                }
                break;
            case "check-fornecedor":
                if (papel === 2) {
                    setPapel(4);
                } else {
                    setPapel(3);
                }
                break;
            case "check-transportador":
                setPapel(5);
                break;
            case "submit":
                x.preventDefault();
                console.log(papel);
                if (nome !== '' && email !== '' && nif !== '' && telem !== '' && password !== '' && checkPassword !== '' && rua !== '' && 
                    dist !== '' && conc !== '' && prefix !== '' && sufix !== '' && (password === checkPassword) && papel !== '') {

                    Axios.post(url+"/api/v2/users/register", {
                        nome: nome, 
                        email: email, 
                        nif: nif, 
                        tlm: telem, 
                        rua: rua,
                        conc: conc, 
                        dist: dist,
                        prefix: prefix,
                        sufix: sufix,
                        passwd: password,
                        papel: papel                       
                    }).then((response) => {
                        if (response.status === 200) {
                            document.getElementById("modal_header_register").innerText = 'Registo bem sucedido!';
                            document.getElementById("modal_body_register").innerHTML = "<p>Clique em 'Continuar' para proseguir para o início de sessão";
                            document.getElementById("continue").onclick = loginWithRedirect;
                        } else {
                            document.getElementById("modal_header_register").innerText = 'Registo Inválido';
                            document.getElementById("modal_body_register").innerHTML = "<p>A(s) razão(ões) pode(m) ser das seguintes:</p> \
                            <ul><li>Já existe uma conta com o email "+email+".</li> \
                            <li>Já existe uma conta com o NIF "+nif+".</li> \
                            <li>Já existe uma conta com o número de telemóvel "+telem+".</li></ul>";
                            document.getElementById("continue").onclick = handleHide;
                            // document.getElementById("modal_footer").innerHTML 
                            // = '<button type="button" onClick={handleHide} className="btn btn-secondary">Cancelar</button><button type="button" className="btn">Continuar</button>';
                        }
                        handleShow();
                    }).catch((err) => {
                        document.getElementById("modal_header_register").innerText = 'Registo Inválido';
                        document.getElementById("modal_body_register").innerHTML = "<p>A(s) razão(ões) pode(m) ser das seguintes:</p> \
                        <ul><li>Já existe uma conta com o email "+email+".</li> \
                        <li>Já existe uma conta com o NIF "+nif+".</li> \
                        <li>Já existe uma conta com o número de telemóvel "+telem+".</li></ul>";
                        document.getElementById("continue").onclick = handleHide;
                    });
                }
                break;
            default:
                console.log();
        }
    }

    return (
        <div>
            <div className="card pr position-absolute top-50 start-50 translate-middle">
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
                                <input type="text" inputMode="numeric" class="form-control" pattern="[0-9]{9}" name="nif" size="50" value={nif} onChange={handler} required />

                            </div>
                            <div className="col-md-12">
                                <label>Número de Telemóvel</label>
                                <input type="text" inputMode="numeric" class="form-control" pattern="[0-9]{9}" name="telem" size="50" value={telem} onChange={handler} required />
                            </div>
                            <div className="col-md-12">
                                <label>Rua</label>
                                <input className="form-control" type="text" name="rua" size="50" onChange={handler} required />
                            </div>
                            <div className="col-md-12">
                                <label>Distrito</label>
                                <select className="form-select" name="distrito" id="distritos" onChange={handler} onInput={concelhos} required>
                                    <option value='' selected>Selecione um Distrito</option>
                                </select>
                            </div>
                            <div className="col-md-12">
                                <label>Concelho</label>
                                <select className="form-select" name="concelho" id="concelhos" onChange={handler} required>
                                    <option value='' selected>Selecione um Concelho</option>
                                </select>
                            </div>
                            <div className="col-md-12">
                                <label>Código Postal</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" pattern="[0-9]{4}" name="prefix" value={prefix} onChange={handler} />
                                    <span class="input-group-text">-</span>
                                    <input type="text" class="form-control" pattern="[0-9]{3}" name="sufix" value={sufix} onChange={handler} />
                                </div>
                            </div>
                            {/* <div className="col-md-12">
                                <label>Foto de Perfil</label>
                                <input className="form-control" type="file" name="profpic" size="50" onChange={handler} />
                            </div> */}
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
                         <div className="modal-header" id="modal_header_register">
                             <button type="button" class="btn-close" aria-label="Close"></button>
                         </div>
                         <div className="modal-body" id="modal_body_register">
                         </div>
                         <div className="modal-footer" id="modal_footer_register">
                         <button className="btn" type="button" id="continue">OK</button>
                         </div>
                     </div>
                 </div>
             </div>
        </div>
    );
}

export default Register;