import React, {useState} from 'react';
import Axios from "axios";

function EditProfile () {
    const [nome, setNome]                   = useState('');
    const [email, setEmail]                 = useState('');
    const [telem, setTelem]                 = useState('');
    const [morada, setMorada]                       = useState('');
    const [password, setPassword]           = useState('');
    const [checkPassword, setCheckPassword] = useState('');

    const handler = (x) => {
        var url = (process.env.REACT_APP_TEST === "true") ? process.env.REACT_APP_TEST_IP : process.env.REACT_APP_DOMAIN;
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
            case "morada":
                setMorada(x.target.value);
                break;
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
                        morada: morada,
                        pwd: password
                    }).then((response) => {
                        console.log(response);
                    })
                }
                break;
            case "delete":
                Axios.delete(url+"/api/v1/users/delete", {
                    // params: {
                    //     id: id
                    // }
                }).then ((response) => {
                    console.log(response);
                })
                break;
            default:
                console.log();
        }
    }

    return(
        <div>
            <div className="card position-absolute top-50 start-50 translate-middle">
                <div className="card-body">
                    <h5 className="card-title">Editar Dados</h5>
                    <h6 className="card-subtitle mb-2">Altere aqui os dados</h6>
                    <form method="post">
                            <div className="col-md-12">
                                <label>Nome Completo</label>
                                <input className="form-control" type="text" name="nome" size="50" onChange={handler}/>
                            </div>
                            <div className="col-md-12">
                                <label>Email</label>
                                <input className="form-control" type="email" name="email" size="50" onChange={handler}/>
                            </div>
                            <div className="col-md-12">
                                <label>NIF</label>
                                <input className="form-control" type="number" name="nif" size="50" onChange={handler}/>
                            </div>
                            <div className="col-md-12">
                                <label>Número de Telemóvel</label>
                                <input className="form-control" type="number" name="telem" size="50" onChange={handler}/>
                            </div>
                            <div className="col-md-12">
                                <label>Password</label>
                                <input className="form-control" type="password" name="password" size="50" onChange={handler}/>
                            </div>
                            <div className="col-md-12">
                                <label>Confirme a Password</label>
                                <input className="form-control" type="password" name="checkPassword" size="50" onChange={handler}/>
                            </div>
                            
                            <button name="delete" className="btn" onClick={handler}>Remover Conta</button>
                            <button id="submit" type="submit" name="submit" className="btn" onClick={handler}>Guardar</button>
                        </form>
                </div>
            </div>
        </div>
    
                
            
        
        
    )
}

export default EditProfile;