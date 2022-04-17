import React, { useState } from "react";
// import Axios from "axios";

function Register() {

    // states for registration
    const [nome, setNome]           = useState('');
    const [email, setEmail]         = useState('');
    const [nif, setNif]             = useState('');
    const [telem, setTelem]         = useState('');
    const [password, setPassword]   = useState('');
    const [checkPassword, setCheckPassword]   = useState('');

    // states for checking errors
    const [submitted, setSubmitted] = useState(false);
    const [error,setError] = useState(false);

    const handler = (x) => {
        switch(x.target.name) {
            case "nome":
                setNome(x.target.value);
                setSubmitted(false);
                break;
            case "email":
                setEmail(x.target.value);
                setSubmitted(false);
                break;
            case "nif":
                setNif(x.target.value);
                setSubmitted(false);
                break;
            case "telem":
                setTelem(x.target.value);
                setSubmitted(false);
                break;
            case "password":
                setPassword(x.target.value);
                setSubmitted(false);
                break;
            case "checkPassword":
                setCheckPassword(x.target.value);
                setSubmitted(false);
                break;
            case "submit":
                x.preventDefault();
                if (nome === '' || email === '' || nif === '' || 
                    telem === '' || password === '' || checkPassword === '') {
                        setError(true);
                } else {
                    setSubmitted(true);
                    setError(false);
                }
                break;
            default:
                console.log();
        }
    }

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

                        <form>
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
                                    <input className="form-check-input" type="checkbox" id="check-consumidor" name="tipo" value="consumidor" />
                                    <label className="form-check-label" for="check-consumidor">Consumidor</label>
                                    <br />
                                    <input className="form-check-input" type="checkbox" id="check-fornecedor" name="tipo" value="fornecedor" />
                                    <label className="form-check-label" for="check-fornecedor">Fornecedor</label>
                                    <br />
                                    <input className="form-check-input" type="checkbox" id="check-transportador" name="tipo" value="transportador" />
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