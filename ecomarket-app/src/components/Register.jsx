import React from "react";

function Register() {
    return (
        <div className="col-8 justify-content-center mt-5">
            <div className="form-holder">
                <div className="form-content position-absolute translate-middle">
                    <div className="form-items">
                        <h3>REGISTO</h3>
                        <p>Registe-se aqui.</p>
                        <form className="" action="#" method="post">
                            <div className="col-md-12">
                                <input className="form-control" type="text" name="nome" placeholder="Nome Completo" required />
                            </div>
                            <div className="col-md-12">
                                <input className="form-control" type="email" name="email" placeholder="Email" required />
                            </div>
                            <div className="col-md-12">
                                <input className="form-control" type="text" name="nif" placeholder="NIF" required />
                            </div>
                            <div className="col-md-12">
                                <input className="form-control" type="text" name="telem" placeholder="Número de Telemóvel" required />
                            </div>
                            <div className="col-md-12">
                                <input className="form-control" type="password" name="password" placeholder="Password" required />
                            </div>
                            <div className="col-md-12">
                                <input className="form-control" type="password" name="password" placeholder="Confirme a Password" required />
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
                            
                            <button id="submit" type="submit" className="btn">Registar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;