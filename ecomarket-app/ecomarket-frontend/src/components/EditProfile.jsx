import Axios from "axios";
import React, {useState} from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function EditProfile () {
    const { user, isLoading }   = useAuth0();
    const [id, setID]         = useState('');
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

    if (!isLoading) {
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


        const handler = (x) => {
            switch(x.target.name) {
                case "nome":
                    setNome(x.target.value);
                    console.log(nome);
                    break;
                case "email":
                    setEmail(x.target.value);
                    break;
                case "nif":
                    if (nif.length < 9 || x.target.value.length < 9) {
                        setNif(x.target.value.replace(/[^0-9]/gi, ''));
                    }
                    break;
                case "telem":
                    if (telem.length < 9 || x.target.value.length < 9) {
                        setTelem(x.target.value.replace(/[^0-9]/gi, ''));
                    }
                    break;
                case "rua":
                    setRua(x.target.value);
                    break;
                case "distrito":
                    setDist(x.target.value);
                    break;
                case "concelho":
                    setConc(x.target.value);
                    break;
                case "prefix":
                    if (prefix.length < 4 || x.target.value.length < 4) {
                        setPrefix(x.target.value.replace(/[^0-9]/gi, ''));
                    }
                    break;
                case "sufix":
                    if (sufix.length < 3 || x.target.value.length < 3) {
                        setSufix(x.target.value.replace(/[^0-9]/gi, ''));
                    }
                    break;
                case "password":
                    setPassword(x.target.value);
                    break;
                case "checkPassword":
                    setCheckPassword(x.target.value);
                    break;
                /* case "morada":
                    setMorada(x.target.value);
                    break; */
                case "submit":
                    x.preventDefault();

                    if (nome === '') {
                        setNome(nomeD);
                    }
                    if (email === '') {
                        setEmail(emailD);
                    }
                    if (nif === '') {
                        setNif(nifD);
                    } 
                    if (telem === '') {
                        setTelem(telemD);
                    }
                    if (rua === '') {
                        setRua(ruaD);
                    } 
                    if (dist === '') {
                        setDist(distD);
                    }
                    if (conc === '') {
                        setConc(concD);
                    }
                    if (prefix === '') {
                        setPrefix(prefixD);
                    }
                    if (sufix === '') {
                        setSufix(sufixD);
                    }
                    if (password === '') {
                        setPassword(false);
                    }

                    console.log(nome, email, nif, telem, rua, dist, conc, prefix, sufix, password);
                    if (nome !== '' && email !== '' && nif !== '' && telem !== '' && rua !== '' && dist !== '' && conc !== '' && prefix !== '' && sufix !== '' && (password === false || password === checkPassword)) {

                        Axios.put(url+"/api/v1/users/edit", {
                            id: id,
                            nome: nome,
                            email: email,
                            nif: nif,
                            tlm: telem,
                            rua: rua,
                            dist: dist,
                            conc: conc,
                            prefix: prefix,
                            sufix: sufix,
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
                                    <input className="form-control" type="text" name="nome" size="50" placeholder={nomeD} onChange={handler} />
                                </div>
                                <div className="col-md-12">
                                    <label>Email</label>
                                    <input className="form-control" type="email" name="email" size="50" placeholder={emailD} onChange={handler} />
                                </div>
                                <div className="col-md-12">
                                    <label>NIF</label>
                                    <input type="text" inputMode="numeric" class="form-control" pattern="[0-9]{9}" name="nif" size="50" value={nif} placeholder={nifD} onChange={handler} />

                                </div>
                                <div className="col-md-12">
                                    <label>Número de Telemóvel</label>
                                    <input type="text" inputMode="numeric" class="form-control" pattern="[0-9]{9}" name="telem" size="50" value={telem} placeholder={telemD} onChange={handler} />
                                </div>
                                <div className="col-md-12">
                                    <label>Rua</label>
                                    <input className="form-control" type="text" name="rua" size="50" placeholder={ruaD} onChange={handler} />
                                </div>
                                <div className="col-md-12">
                                    <label>Distrito</label>
                                    <select className="form-select" name="distrito" id="distritos" onChange={handler} >
                                        <option value=''>Selecione um Distrito</option>
                                    </select>
                                    {/* {distritos()} */}
                                </div>
                                <div className="col-md-12">
                                    <label>Concelho</label>
                                    <select className="form-select" name="concelho" id="concelhos" onChange={handler} >
                                        <option value=''>Selecione um Concelho</option>
                                    </select>
                                    {/* {concelhos()} */}
                                </div>
                                <div className="col-md-12">
                                    <label>Código Postal</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" pattern="[0-9]{4}" name="prefix" value={prefix} placeholder={prefixD} onChange={handler} />
                                        <span class="input-group-text">-</span>
                                        <input type="text" class="form-control" pattern="[0-9]{3}" name="sufix" value={sufix} placeholder={sufixD} onChange={handler} />
                                    </div>
                                </div>
                                {/* <div className="col-md-12">
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
                                <button type="submit" id="remove" name="delete" className="btn" onClick={handler} >Remover Conta</button>
                            </form>
                    </div>
                </div>);
    } else {
        return (<div></div>);
    }
}

export default EditProfile;