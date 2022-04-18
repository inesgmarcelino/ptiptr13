import React, { useState } from "react";
import Axios from "axios";
import $ from 'jquery';

function Register() {

    // states for registration
    const [nome, setNome]                           = useState('');
    const [email, setEmail]                         = useState('');
    const [nif, setNif]                             = useState('');
    const [telem, setTelem]                         = useState('');
    const [password, setPassword]                   = useState('');
    const [checkPassword, setCheckPassword]         = useState('');
    const [checkConsumidor, setConsumidor]          = useState(false);
    const [checkFornecedor, setFornecedor]          = useState(false);
    const [checkTransportador, setTransportador]    = useState(false);
    const [moradaConsumidor, setMorada]             = useState('');

    const handleShow = () => {
        // console.log($("#modal").css("display", "block"))
        // $("#modal").show(true);
        // console.log($("#modal"));
        $("#modal").css("display", "block");
    }

    const handleHide = () => {
        document.getElementById("modal").modal('hide');
    }

    const handler = (x) => {
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
            case "password":
                setPassword(x.target.value);
                break;
            case "checkPassword":
                setCheckPassword(x.target.value);
                break;
            case "check-consumidor":
                setConsumidor(x.target.checked);
                if (x.target.checked) {
                    document.getElementById("morada").style.display = 'block';
                    document.getElementById("check-transportador").disabled = true;
                } else {
                    document.getElementById("morada").style.display = 'none';
                    document.getElementById("check-transportador").disabled = false;
                }
                break;
            case "morada":
                setMorada(x.target.value);
                break;
            case "check-fornecedor":
                setFornecedor(x.target.checked);
                if (x.target.checked) {
                    document.getElementById("check-transportador").disabled = true;
                } else {
                    document.getElementById("check-transportador").disabled = false;
                } 
                break;
            case "check-transportador":
                setTransportador(x.target.checked);
                if (x.target.checked) {
                    document.getElementById("check-consumidor").disabled = true;
                    document.getElementById("check-fornecedor").disabled = true;
                } else {
                    document.getElementById("check-consumidor").disabled = false;
                    document.getElementById("check-fornecedor").disabled = false;
                }
                break;
            case "submit":
                x.preventDefault();
                if (nome === '' || email === '' || nif === '' || 
                    telem === '' || password === '' || checkPassword === '' ||
                    // verificar passwords
                    (password !== checkPassword) || 
                    // garante que quando se é transportador, n pode adquirir nenhum dos outros papeis
                    (checkTransportador && (checkConsumidor || checkFornecedor)) ||
                    // garante que consumidor tem morada
                    (checkConsumidor && moradaConsumidor === '')) {
                        // setError(true);
                } else {
                    Axios.post("http://localhost:3001/api/register", {
                        nome: nome, 
                        email: email, 
                        nif: nif, 
                        tlm: telem, 
                        pwd: password,
                        cons: checkConsumidor,
                        morada: moradaConsumidor,
                        forn: checkFornecedor,
                        trans: checkTransportador
                    }).then((response) => {
                        console.log(response);
                        if (response.data === "success") {
                            document.getElementById("modal_header").innerText = 'a';
                            document.getElementById("modal_body").innerText = 'b';
                            document.getElementById("modal_footer").innerHTML 
                            = '<button type="button" onClick={handleHide} className="btn btn-secondary">Cancelar</button><button type="button" className="btn">Continuar</button>';
                        } else {
                            document.getElementById("modal_header").innerText = 'aa';
                            document.getElementById("modal_body").innerText = 'bb';
                            document.getElementById("modal_footer").innerHTML 
                            = '<button type="button" onClick={handleHide} className="btn btn-secondary">Cancelar</button><button type="button" className="btn">Continuar</button>';
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
        <div className="col-8 justify-content-center mt-5">
            <div className="form-holder">
                <div className="form-content position-absolute" style={{margin: "-70px 0 0 0"}}>
                    <div className="form-items">
                        <h3>REGISTO</h3>
                        <p>Registe-se aqui.</p>

                        {/* <div className="messages">
                            {errorMessage()}
                            {successMessage()}
                        </div> */}

                        <form method="post">
                            <div className="col-md-12">
                                <input className="form-control" type="text" name="nome" placeholder="Nome Completo" onChange={handler} required />
                            </div>
                            <div className="col-md-12">
                                <input className="form-control" type="email" name="email" placeholder="Email" onChange={handler} required />
                            </div>
                            <div className="col-md-12">
                                <input className="form-control" type="text" name="nif" placeholder="NIF" onChange={handler} required />
                            </div>
                            <div className="col-md-12">
                                <input className="form-control" type="text" name="telem" placeholder="Número de Telemóvel" onChange={handler} required />
                            </div>
                            <div className="col-md-12">
                                <input className="form-control" type="password" name="password" placeholder="Password" onChange={handler} required />
                            </div>
                            <div className="col-md-12">
                                <input className="form-control" type="password" name="checkPassword" placeholder="Confirme a Password" onChange={handler} required />
                            </div>
                            <div className="col-md-12">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="check-consumidor" name="check-consumidor" onChange={handler} />
                                    <label className="form-check-label" for="check-consumidor">Consumidor</label>
                                    <input className="form-control" type="text" name="morada" placeholder="Adicione a sua morada" id="morada" onChange={handler} required />
                                    <br />
                                    <input className="form-check-input" type="checkbox" id="check-fornecedor" name="check-fornecedor" onChange={handler} />
                                    <label className="form-check-label" for="check-fornecedor">Fornecedor</label>
                                    <br />
                                    <input className="form-check-input" type="checkbox" id="check-transportador" name="check-transportador" onChange={handler} />
                                    <label className="form-check-label" for="check-transportador">Transportador</label>
                                </div>
                            </div>
                            
                            <button id="submit" type="submit" name="submit" className="btn" onClick={handler} data-bs-toggle="modal" data-bs-target="#modal">Registar</button>
                        </form>


                    </div>
                </div>
            </div>
            {/* MODAL */}
            <div className="modal fade" id="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header" id="modal_header">
                        </div>
                        <div className="modal-body" id="modal_body">
                        </div>
                        <div className="modal-footer" id="modal_footer">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;