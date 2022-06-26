import { useState } from "react";
import Axios from 'axios';

function CarRegister(){

    return(
        <div>
            <div className="cardForn pr position-absolute top-50 start-50 translate-middle">
                <div className="card-body">
                    <h5 className="card-title">Adicionar Veículo</h5>
                    <h6 className="card-subtitle mb-2">Condições do Veículo</h6>
                    <form method="post">
                        <div className="col-md-12">
                            <label>Marca:</label>
                            <input className="form-control" type="text" name="marcaCar"  size="50" onChange={handler} required/>
                        </div>
                        <div className="col-md-12">
                            <label>Ano:</label>
                            <input className="form-control" type="number" name="anoCar"  size="50" onChange={handler} required/>
                        </div>
                        <div className="col-md-12">
                            <label>Caixa de Velocidades:</label>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="check-automatico" name="check-automatico" onChange={handler} />
                                <label className="form-check-label" htmlFor="check-automatico">Automático</label>
                                <br />
                                <input className="form-check-input" type="checkbox" id="check-manual" name="check-manual" onChange={handler} />
                                <label className="form-check-label" htmlFor="check-manual">Manual</label>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <label>Combustível</label>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="check-gasolina" name="check-gasolina" onChange={handler} />
                                <label className="form-check-label" htmlFor="check-gasolina">Gasolina</label>
                                <br />
                                <input className="form-check-input" type="checkbox" id="check-gasoleo" name="check-gasoleo" onChange={handler} />
                                <label className="form-check-label" htmlFor="check-gasoleo">Gasóleo</label>
                                <br />
                                <input className="form-check-input" type="checkbox" id="check-eletrico" name="check-eletrico" onChange={handler} />
                                <label className="form-check-label" htmlFor="check-eletrico">Elétrico</label>
                                <br />
                                <input className="form-check-input" type="checkbox" id="check-hibrido" name="check-hibrido" onChange={handler} />
                                <label className="form-check-label" htmlFor="check-hibrido">Híbrido</label>
                            </div>
                        </div>
                        <div className="col-md-12">
                                <label>Emissão de CO2</label>
                                <input className="form-control" type="number" name="emissaoCO2" size="50" onChange={handler} required />
                            </div>

                    </form>
                </div>
            </div>
        </div>
    )
}