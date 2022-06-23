import React, {useState} from 'react';
import Axios from "axios";

function EditProfile () {
    const [nome, setNome]                   = useState('');
    const [email, setEmail]                 = useState('');
    const [nif, setNif]                     = useState('');
    const [telem, setTelem]                 = useState('');
    /* const [morada, setMorada]               = useState(''); */
    const [password, setPassword]           = useState('');
    const [checkPassword, setCheckPassword] = useState('');

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
                    Axios.put("https://ecomarket.works/api/v1/users/edit", {
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
                Axios.delete("https://ecomarket.works/api/v1/users/delete", {
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
                                <input className="form-control" type="text" name="nif" size="50" onChange={handler}/>
                            </div>
                            <div className="col-md-12">
                                <label>Número de Telemóvel</label>
                                <input className="form-control" type="text" name="telem" size="50" onChange={handler}/>
                            </div>
                            <div className="col-md-12">
                                <label>Password</label>
                                <input className="form-control" type="password" name="password" size="50" onChange={handler}/>
                            </div>
                            <div className="col-md-12">
                                <label>Confirme a Password</label>
                                <input className="form-control" type="password" name="checkPassword" size="50" onChange={handler}/>
                            </div>
                            
                            <button id="removerconta" name="delete" className="btn" onClick={handler}>Remover Conta</button>
                            <button id="guardardados" type="submit" name="submit" className="btn" onClick={handler}>Guardar</button>
                        </form>
                </div>
            </div>
        </div>
    
                
            
        
        
    )
}

export default EditProfile;