import { useState } from "react";
import Axios from 'axios';

function CarRegister(){
    // const { user } = useAuth0();
    const id = 4; //testar forn
    

    const [marca, setMarca]                 = useState('');
    const [ano, setAno]                     = useState('');
    const [caixa, setCaixa]                 = useState('');
    const [combustivel, setCombustivel]     = useState('');

    const handler = (x) => {
        var url = (process.env.REACT_APP_TEST === "true") ? process.env.REACT_APP_TEST_IP : process.env.REACT_APP_DOMAIN;
        switch (x.target.name) {
            case "marcaCar":
                setMarca(x.target.value);
                break;
            case "anoCar":
                setAno(x.target.value);
                break;
            case "check-automatico":
                setCaixa(x.target.value);
                if (document.getElementById("check-automatico").checked) {
                    document.getElementById("check-manual").disabled = true;
                } else {
                    document.getElementById("check-manual").disabled = false;
                }
                break;
            case "check-manual":
                setCaixa(x.target.value);
                if (document.getElementById("check-manual").checked) {
                    document.getElementById("check-automatico").disabled = true;
                } else {
                    document.getElementById("check-automatico").disabled = false;
                }
                break;
            case "check-gasolina":
                setCombustivel(x.target.value);
                if (document.getElementById("check-gasolina").checked) {
                    document.getElementById("check-gasoleo").disabled = true;
                    document.getElementById("check-eletrico").disabled = true;
                } else {
                    document.getElementById("check-gasoleo").disabled = false;
                    document.getElementById("check-eletrico").disabled = false;
                }
                break;
            case "check-gasoleo":
                setCombustivel(x.target.value);
                if (document.getElementById("check-gasoleo").checked) {
                    document.getElementById("check-gasolina").disabled = true;
                    document.getElementById("check-eletrico").disabled = true;
                } else {
                    document.getElementById("check-gasolina").disabled = false;
                    document.getElementById("check-eletrico").disabled = false;
                }
                break;
            case "check-eletrico":
                setCombustivel(x.target.value);
                if (document.getElementById("check-eletrico").checked) {
                    document.getElementById("check-gasoleo").disabled = true;
                    document.getElementById("check-gasolina").disabled = true;
                } else {
                    document.getElementById("check-gasoleo").disabled = false;
                    document.getElementById("check-gasolina").disabled = false;
                }
                break;
            case "submit":
                break;
            default:
                console.log();
        }
    }

    return(
        <div>
            <div className="cardForn position-absolute top-50 start-50 translate-middle">
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
                            <div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="check-automatico" name="check-automatico" onChange={handler} />
                                    <label className="form-check-label" htmlFor="check-automatico">Automático</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="check-manual" name="check-manual" onChange={handler} />
                                    <label className="form-check-label" htmlFor="check-manual">Manual</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <label>Combustível</label>
                            <div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="check-gasolina" name="check-gasolina" onChange={handler} />
                                    <label className="form-check-label" htmlFor="check-gasolina">Gasolina</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="check-gasoleo" name="check-gasoleo" onChange={handler} />
                                    <label className="form-check-label" htmlFor="check-gasoleo">Gasóleo</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="check-eletrico" name="check-eletrico" onChange={handler} />
                                    <label className="form-check-label" htmlFor="check-eletrico">Elétrico</label>
                                </div>
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
    );
}

export default CarRegister;