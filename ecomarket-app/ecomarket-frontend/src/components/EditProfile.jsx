import Axios from "axios";
import React, {useState} from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from "react-router-dom";

function EditProfile () {
    const { user, isLoading, logout }   = useAuth0();
    let { id } = useParams();
    var url = (process.env.REACT_APP_TEST === "true") ? process.env.REACT_APP_TEST_IP : process.env.REACT_APP_DOMAIN;
    
    // states for editing
    var nome            = '';
    var email           = '';
    var nif             = '';
    var telem           = '';
    var password        = '';
    var checkPassword   = '';

    // default values
    const [nomeD, setNomeD]                           = useState('');
    const [emailD, setEmailD]                         = useState('');
    const [nifD, setNifD]                             = useState('');
    const [telemD, setTelemD]                         = useState('');
    const [papel, setPapel]                           = useState();

    console.log(id);

    const getsUser = () => {
        Axios.get(url+"/api/v2/users", {
            params: {
                email: user.email
            }}).then((response) => {
            if (response.data.message !== 'fail') {
                setPapel(response.data.results[0].papel);
                if (response.data.results[0].papel === 1) {
                    Axios.get(url+"/api/v2/users/id", {
                        params : {
                            id: id
                    }}).then((response2) => {
                        setNomeD(response2.data.results[0].nome);
                        setEmailD(response2.data.results[0].email);
                        setNifD(response2.data.results[0].nif);
                        setTelemD(response2.data.results[0].phone);
                    });
                } else {
                    setNomeD(response.data.results[0].nome);
                    setEmailD(response.data.results[0].email);
                    setNifD(response.data.results[0].nif);
                    setTelemD(response.data.results[0].phone);
                }
            }
            });
    }

    if (!isLoading) {
        getsUser();

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
                                if (papel === 1) {
                                    window.location.href = "http://localhost:3000/adminUsersList";  //to be changed
                                } else {
                                    window.location.href = "http://localhost:3000/profile";  //to be changed
                                }
                                
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

            <div className="card pr1 position-absolute top-50 start-50 translate-middle">
                <div className="card-body">
                    <h5 className="card-title">Edição da Conta</h5>
                    <h6 className="card-subtitle mb-2">Edite aqui os dados da sua conta</h6>
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
                        <div className="col-md-12">
                            <label>Password</label>
                            <input className="form-control" type="password" name="password"size="50" onChange={handler}  />
                        </div>
                        <div className="col-md-12">
                            <label>Confirme a Password</label>
                            <input className="form-control" type="password" name="checkPassword" size="50" onChange={handler}  />
                        </div>
                        <div className="col-md-12">
                            <button type="submit" name="submit" className="btn btn2" onClick={handler} >Guardar</button>
                            <button type="submit" id="remove" name="delete" className="btn btn2" onClick={handler} >Remover Conta</button>
                        </div>
                    </form>
                </div>
            </div>);
    } else {
        return (<div></div>);
    }
}

export default EditProfile;