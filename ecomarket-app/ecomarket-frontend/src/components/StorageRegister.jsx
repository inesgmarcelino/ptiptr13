import { useState } from "react";
import Axios from 'axios';

function ArmazemRegister(){
    var cp = "xxxx-xxx";
    const [moradaArm, setMoradaArm]     = useState('');
    const [codpostal, setCodPostal]     = useState('');
    const [dist, setDist]               = useState('');
    const [conc, setConc]               = useState('');

    const handler = (x) => {
        switch(x.target.name) {
            case "morada":
                setMoradaArm(x.target.value);
                break;
            case "codigoPostal1":
                var cod = 0;
                if (x.target.value < 1000 && x.target.value > 99) {
                    cod = parseInt('0'+ x.target.value);
                } else if (x.target.value < 100 && x.target.value > 9) {
                    cod = parseInt('00' + x.target.value);
                } else if (x.target.value < 10) {
                    cod = parseInt('000' +  x.target.value);
                } else {
                    cod = x.target.value;
                }

                var c = cp.split('-');
                cp = cod + '-' + c[1];
                if (c[1] !== "xxx") {
                    setCodPostal(cp);
                }
                break;
            case "codigoPostal2":
                var cod1 = 0;
                if (x.target.value < 100 && x.target.value > 9) {
                    cod1 = parseInt^('0' + x.target.value);
                } else if (x.target.value < 10) {
                    cod1 = parseInt('00' + x.target.value);
                } else {
                    cod1 = x.target.value;
                }

                var c1 = cp.split('-');
                cp = c1[0] + '-' + cod1;
                if (c1[0] !== "xxxx") {
                    setCodPostal(cp);
                }
                break;
            case "distrito":
                setDist(x.target.value);
                break;
            case "concelho":
                setConc(x.target.value);
                break;
            case "submit":
                x.preventDefault();
                if (moradaArm === '' || codpostal === '' || 'x' in codpostal || dist === '' || conc === '') {
                    // setError(true)
                } else {
                    Axios.post("https://ecomarket.works/api/v1/providers/reg_storage", {
                        // id: id,
                        morada: moradaArm,
                        codpostal: codpostal,
                        dist: dist,
                        conc: conc
                    }).then((response) => {
                        console.log(response);
                    })
                }
                break;
            default:
                console.log();
        }
    }

    return(
        <div>
        <div className="cardForn position-absolute top-50 start-50 translate-middle">
            <div className="card-body">
                <h5 className="card-title">FORNECEDOR:</h5>
                <h6 className="card-subtitle mb-2">Registe aqui o armazém</h6>
                <form method="post">
                         <div className="col-md-12">
                            <label>Morada</label> {/*  falta coordenadas */}
                                <input className="form-control" type="text" name="morada" size="50" onChange={handler} required/>
                         </div>
                         <div className="col-md-12">
                            <label>Código Postal</label>
                                <input className="form-control" type="number" max={9999} name="codigoPostal1" size="30" onChange={handler} required/>
                                -
                                <input className="form-control" type="number" max={999} name="codigoPostal2" size="20" onChange={handler} required/>
                         </div>
                         <div className="col-md-12">
                            <label>Distrito</label>
                                <select name="distrito" onChange={handler} required>
                                    <option value='' selected>Selecione um Distrito</option>
                                    {/* loop para ir buscar as cenas à bd */}
                                </select>
                         </div>
                         <div className="col-md-12">
                            <label>Concelho</label>
                                <select name="concelho" onChange={handler} required>
                                    <option value='' selected>Selecione um Concelho</option>
                                    {/* loop para ir buscar as cenas à bd */}
                                </select>
                         </div>
                        
                         <button id="submit" type="submit" name="submit" className="btn" onClick={handler}>Registar</button>
                     </form>
            </div>
        </div> 
        </div>
    );
}

export default ArmazemRegister;