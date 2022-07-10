import Axios from "axios";
import React, {useState} from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function EditProfile () {
    const { user, isLoading }               = useAuth0();
    var url = (process.env.REACT_APP_TEST === "true") ? process.env.REACT_APP_TEST_IP : process.env.REACT_APP_DOMAIN;
    
    // states for editing
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

    if (!isLoading) {
        const getsUser = () => {
            Axios.get(url+"/api/v2/users", {
                params: {
                  email: user.email
              }}).then((response) => {
                if (response.data.message !== 'fail') {
                  setNome(response.data.results[0].nome);
                  setEmail(response.data.results[0].email);
                  setNif(response.data.results[0].nif);
                  setTelem(response.data.results[0].phone);
                  setRua(response.data.results[0].street);
                  setDist(response.data.results[0].dist);
                  setConc(response.data.results[0].conc);
                  setPrefix(response.data.results[0].prefix);
                  if (response.data.results[0].sufix.length === 2) {
                      setSufix("0"+response.data.results[0].sufix);
                  } else if (response.data.results[0].sufix.length === 1) {
                    setSufix("00"+response.data.results[0].sufix);
                  } else {
                    setSufix(response.data.results[0].sufix);
                  }
                }
              });
        }
        getsUser();

        
    const distritos = () => {
        Axios.get(url+"/api/v1/gets/distritos").then((response) => {
            var dist = response.data.results;
            for (var i = 0; i < dist.length; i++) {
                if (dist[i]["id"] === dist) {
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
                dist: dist
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


    const handler = (x) => {
        switch(x.target.name) {
            case "nome":
                setNome(x.target.value);
                break;
            case "email":
                setEmail(x.target.value);
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
            case "nif":
                setNif(x.target.value);
                break;
            /* case "morada":
                setMorada(x.target.value);
                break; */
            case "submit":
                x.preventDefault();
                if (password !== '' && checkPassword !== '' && password !== checkPassword){
                        // setError(true);
                } else{

                    Axios.put(url+"/api/v1/users/edit", {
                        // params: {
                        //     id: id
                        // },
                        nome: nome,
                        email: email,
                        tlm: telem,
                        nif: nif,
                        /* morada: morada, */
                        pwd: password
                    }).then((response) => {
                        console.log(response);
                        if (response.data.message === "success") {
                            document.getElementById("guardardados").innerText = 'Dados da conta alterados com sucesso!';
                        }
                        else {
                            document.getElementById("guardardados").innerText = 'Alteração de dados da conta inválido.';
                        }

                    })
                }
                break;
            case "delete":
                Axios.delete(url+"/api/v1/users/delete", { 
                    // params: {
                    //     id: id
                    // }
                    nome: nome,
                    email: email,
                    tlm: telem,
                    nif: nif,
                    /* morada: morada, */
                    pwd: password
                }).then ((response) => {
                    console.log(response);
                    if (response.data.message === "success") {
                        document.getElementById("removerconta").innerText = 'Conta removida com sucesso!';
                    }
                    else {
                        document.getElementById("removerconta").innerText = 'Conta não foi removida com sucesso.';
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
                                <input className="form-control" type="text" name="nome" size="50" value={nome} onChange={handler} required />
                            </div>
                            <div className="col-md-12">
                                <label>Email</label>
                                <input className="form-control" type="email" name="email" size="50" value={email} onChange={handler} required />
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
                                <input className="form-control" type="text" name="rua" size="50" value={rua} onChange={handler} required />
                            </div>
                            <div className="col-md-12">
                                <label>Distrito</label>
                                <select className="form-select" name="distrito" id="distritos" onChange={handler} required>
                                </select>
                            </div>
                            <div className="col-md-12">
                                <label>Concelho</label>
                                <select className="form-select" name="concelho" id="concelhos" onChange={handler} required>
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
                            
                             <button id="submit" type="submit" name="submit" className="btn" onClick={handler}>Registar</button>
                         </form>
                </div>
            </div>);
    } else {
        return (<div></div>);
    }
}

export default EditProfile;