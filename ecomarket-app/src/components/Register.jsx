import React, { useEffect, useState } from "react";
import Axios from "axios";

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

    // states for checking errors
    // const [submitted, setSubmitted] = useState(false);
    // const [error,setError] = useState(false);

    const handler = (x) => {
        switch(x.target.name) {
            case "nome":
                setNome(x.target.value);
                // setSubmitted(false);
                break;
            case "email":
                setEmail(x.target.value);
                // setSubmitted(false);
                break;
            case "nif":
                setNif(x.target.value);
                // setSubmitted(false);
                break;
            case "telem":
                setTelem(x.target.value);
                // setSubmitted(false);
                break;
            case "password":
                setPassword(x.target.value);
                // setSubmitted(false);
                break;
            case "checkPassword":
                setCheckPassword(x.target.value);
                // setSubmitted(false);
                break;
            case "check-consumidor":
                setConsumidor(x.target.checked);
                if (x.target.checked) {
                    document.getElementById("morada").style.display = 'block';
                } else {
                    document.getElementById("morada").style.display = 'none';
                }
                break;
            case "morada":
                setMorada(x.target.value);
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
                    });
                }
                break;
            default:
                console.log();
        }
    }

    // useEffect(() => {
    //     Axios.get("http://localhost:3001/api/get").then((response) => {
    //         console.log(response.data);
    //     });
    // }, []);

    // // showing success message
    // const successMessage = () => {
    //     return (
    //         <div className="success" style={{display: submitted ? '' : 'none'}}>
    //             <h1>User {nome} successfully registered!</h1>
    //         </div>
    //     );
    // };

    // // showing error message if error true
    // const errorMessage = () => {
    //     return (
    //         <div className="error" style={{display: error ? '' : 'none'}}>
    //             <h1>Please enter all the fields</h1>
    //         </div>
    //     );
    // };
    
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
                            
                            <button id="submit" type="submit" name="submit" className="btn" onClick={handler}>Registar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;