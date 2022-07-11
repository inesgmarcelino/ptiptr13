import Axios from "axios";
import React, {useState} from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function EditProfile () {
    const { user, isLoading, logout }   = useAuth0();
    const [id, setID]         = useState('');
    var url = (process.env.REACT_APP_TEST === "true") ? process.env.REACT_APP_TEST_IP : process.env.REACT_APP_DOMAIN;
    
    // states for editing
    var nome            = '';
    var email           = '';
    var nif             = '';
    var telem           = '';
    var rua             = '';
    var dist            = '';
    var conc            = '';
    var prefix          = '';
    var sufix           = '';
    var password        = '';
    var checkPassword   = '';

    // default values
    const [nomeD, setNomeD]                           = useState('');
    const [emailD, setEmailD]                         = useState('');
    const [nifD, setNifD]                             = useState('');
    const [telemD, setTelemD]                         = useState('');
    const [ruaD, setRuaD]                             = useState('');
    const [distD, setDistD]                           = useState('');
    const [concD, setConcD]                           = useState('');
    const [prefixD, setPrefixD]                       = useState('');
    const [sufixD, setSufixD]                         = useState('');

    const getsUser = () => {
        Axios.get(url+"/api/v2/users", {
            params: {
              email: user.email
          }}).then((response) => {
            if (response.data.message !== 'fail') {
                setID(response.data.results[0].id);
                setNomeD(response.data.results[0].nome);
                setEmailD(response.data.results[0].email);
                setNifD(response.data.results[0].nif);
                setTelemD(response.data.results[0].phone);
                setRuaD(response.data.results[0].street);
                setDistD(response.data.results[0].dist);
                setConcD(response.data.results[0].conc);
                setPrefixD(response.data.results[0].prefix);
                if (response.data.results[0].sufix.length === 2) {
                    setSufixD("0"+response.data.results[0].sufix);
                } else if (response.data.results[0].sufix.length === 1) {
                    setSufixD("00"+response.data.results[0].sufix);
                } else {
                    setSufixD(response.data.results[0].sufix);
                }
            }
          });
    }

    if (!isLoading) {
        getsUser();
        
        const distritos = () => {
            Axios.get(url+"/api/v1/gets/distritos").then((response) => {
                var dist = response.data.results;
                for (var i = 0; i < dist.length; i++) {
                    if (dist[i]["id"] === distD) {
                        document.getElementById("distritos").innerHTML += "<option value='" + dist[i]["id"] + "' selected>" + dist[i]["nome"] + "</option>";
                    } else {
                        document.getElementById("distritos").innerHTML += "<option value='" + dist[i]["id"] + "'>" + dist[i]["nome"] + "</option>";
                    }
                }
            });
        }

        const concelhos = () => {
            document.getElementById("concelhos").innerHTML = "<option value='' selected>Selecione um Concelho</option>";
            Axios.get(url+"/api/v1/gets/concelhos", { 
                params: { 
                    dist: distD
            }}).then((response) => {
                var conc = response.data.results;
                for (var i = 0; i < conc.length; i++) {
                    if (conc[i]["id"] === conc) {
                        document.getElementById("concelhos").innerHTML += "<option value='" + conc[i]["id"] + "' selected>" + conc[i]["nome"] + "</option>";
                    }
                    document.getElementById("concelhos").innerHTML += "<option value='" + conc[i]["id"] + "'>" + conc[i]["nome"] + "</option>";
                }
            });
        }

        const setDefaults = () => {
            if (nome === '') {
                nome = nomeD;
            }
            if (email === '') {
                email = emailD;
            }
            if (nif === '') {
                nif = nifD;
            } 
            if (telem === '') {
                telem = telemD;
            }
            if (rua === '') {
                rua = ruaD;
            } 
            if (dist === '') {
                dist = distD;
            }
            if (conc === '') {
                conc = concD;
            }
            if (prefix === '') {
                prefix = prefixD;
            }
            if (sufix === '') {
                sufix = sufixD;
            }
            if (password === '') {
                password = false;
            }
        }

        const handler = (x) => {
            switch(x.target.name) {
                case "nome":
                    console.log("aqui")
                    nome = x.target.value;
                    console.log(nome);
                    break;
                case "email":
                    console.log("aqui2")
                    email = x.target.value;
                    break;
                case "nif":
                    console.log("aqui3")
                    if (nif.length < 9 || x.target.value.length < 9) {
                        nif = x.target.value.replace(/[^0-9]/gi, '');
                    }
                    break;
                case "telem":
                    console.log("aqui4")
                    if (telem.length < 9 || x.target.value.length < 9) {
                        telem = x.target.value.replace(/[^0-9]/gi, '');
                    }
                    break;
                case "rua":
                    console.log("aqui5")
                    rua = x.target.value;
                    break;
                case "distrito":
                    console.log("aqui6")
                    dist = x.target.value;
                    break;
                case "concelho":
                    console.log("aqui7")
                    conc = x.target.value;
                    break;
                case "prefix":
                    console.log("aqui8")
                    if (prefix.length < 4 || x.target.value.length < 4) {
                        prefix = x.target.value.replace(/[^0-9]/gi, '');
                    }
                    break;
                case "sufix":
                    console.log("aqui9")
                    if (sufix.length < 3 || x.target.value.length < 3) {
                        sufix = x.target.value.replace(/[^0-9]/gi, '');
                    }
                    break;
                case "password":
                    console.log("aqui10")
                    password = x.target.value;
                    break;
                case "checkPassword":
                    console.log("aqui11")
                    checkPassword = x.target.value;
                    break;
                case "submit":
                    console.log("aqui12")
                    x.preventDefault();
                    setDefaults();
                    
                    if (password === false || password === checkPassword) {
                        console.log("aqui14")
                        Axios.put(url+"/api/v2/users/edit", {
                            id: id,
                            nome: nome,
                            email: email,
                            nif: nif,
                            tlm: telem,
                            pwd: password
                        }).then((response) => {
                            console.log(response);
                            if (response.data.message === "success") {
                                document.getElementById("guardardados").innerText = 'Dados da conta alterados com sucesso!';
                            } else {
                                document.getElementById("guardardados").innerText = 'Alteração de dados da conta inválido.';
                            }

                        })
                    }
                    break;
                case "delete":
                    x.preventDefault();
                    Axios.delete(url+"/api/v2/users/delete", { 
                        params: {
                            id: id
                        }}).then ((response) => {
                        console.log(response);
                        if (response.data.message === "success") {
                            logout({returnTo: window.location.origin,});
                            }
                    })
                    break;
                default:
                    console.log();
            }
        }

        return(
            <div className="card pr position-absolute top-50 start-50 translate-middle">
                    <div className="card-body">
                        <h5 className="card-title">REGISTO</h5>
                        <h6 className="card-subtitle mb-2">Registe-se aqui</h6>
                        <form method="post">
                                <div className="col-md-12">
                                    <label>Nome Completo</label>
                                    <input className="form-control" type="text" name="nome" size="50" placeholder={nomeD} onChange={handler} />
                                </div>
                                <div className="col-md-12">
                                    <label>Email</label>
                                    <input className="form-control" type="email" name="email" size="50" placeholder={emailD} value={email} onChange={handler} />
                                </div>
                                <div className="col-md-12">
                                    <label>NIF</label>
                                    <input type="text" inputMode="numeric" class="form-control" pattern="[0-9]{9}" name="nif" size="50" value={nif} placeholder={nifD} onChange={handler} />

                                </div>
                                <div className="col-md-12">
                                    <label>Número de Telemóvel</label>
                                    <input type="text" inputMode="numeric" class="form-control" pattern="[0-9]{9}" name="telem" size="50" value={telem} placeholder={telemD} onChange={handler} />
                                </div>
                                {/* <div className="col-md-12">
                                    <label>Rua</label>
                                    <input className="form-control" type="text" name="rua" size="50" placeholder={ruaD} value={rua} onChange={handler} />
                                </div> */}
                                {/* <div className="col-md-12">
                                    <label>Distrito</label>
                                    <select className="form-select" name="distrito" id="distritos" onChange={handler} >
                                        <option value=''>Selecione um Distrito</option>
                                    </select>
                                </div>
                                <div className="col-md-12">
                                    <label>Concelho</label>
                                    <select className="form-select" name="concelho" id="concelhos" onChange={handler} >
                                        <option value=''>Selecione um Concelho</option>
                                    </select>
                                </div>
                                <div className="col-md-12">
                                    <label>Código Postal</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" pattern="[0-9]{4}" name="prefix" value={prefix} placeholder={prefixD} onChange={handler} />
                                        <span class="input-group-text">-</span>
                                        <input type="text" class="form-control" pattern="[0-9]{3}" name="sufix" value={sufix} placeholder={sufixD} onChange={handler} />
                                    </div>
                                </div> 
                                <div className="col-md-12">
                                    <label>Foto de Perfil</label>
                                    <input className="form-control" type="file" name="profpic" size="50" onChange={handler} />
                                </div> */}
                                <div className="col-md-12">
                                    <label>Password</label>
                                    <input className="form-control" type="password" name="password"size="50" onChange={handler}  />
                                </div>
                                <div className="col-md-12">
                                    <label>Confirme a Password</label>
                                    <input className="form-control" type="password" name="checkPassword" size="50" onChange={handler}  />
                                </div>
                                
                                <button type="submit" name="submit" className="btn" onClick={handler} >Guardar</button>
                                <button id="remove" name="delete" className="btn" onClick={handler} >Remover Conta</button>
                            </form>
                    </div>
                </div>);
    } else {
        return (<div></div>);
    }
}

export default EditProfile;