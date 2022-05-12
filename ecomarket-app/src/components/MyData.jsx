import React from 'react'
import { useState } from 'react';

function MyData () {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [tele, setTele] = useState('');
    const [pass, setPass]  = useState('');

    const handler = (x) => {
        switch(x.target.name) {
            case "nome":
                setNome(x.target.value);
                break;
            case "email":
                setEmail(x.target.value);
                break;
            case "tele":
                setTele(x.target.value);
                break;
            case "pass":
                setPass(x.target.value);
                break;
            case "submit":
                x.preventDefault();
                break;

        }
    }

    return(
        <div className="mydata">´
            <div className="container">
                <br />
                <h3>Está a editar os seus dados.</h3>
            </div>
            <br />
            <div className="container" style={{textAlign : 'center'}}>
                <form method="post" style={{display: 'inline-block'}}>
                        <label>NOME : 
                            <input className="form-control" type="text" name="nome" placeholder="Nome" /* onChange={handler} required */ />
                        </label>
                    <div className="col-md-12">
                        <label>
                            EMAIL : 
                            <input className="form-control" type="email" name="email" placeholder="Email" />
                        </label>
                    </div>
                    <div className="col-md-12">
                        <label>
                            TELEMOVEL :
                            <input className="form-control" type="text" name="telemovel" placeholder="Telemovel" />
                        </label>
                    </div>
                    <div className="col-md-12">
                        <label>
                            PALAVRA-PASSE :
                            <input className="form-control" type="password" name="palavra-chave" placeholder="Palavra-chave" />
                        </label>
                    </div>
                    <div className="container">
                        <button type="button" className="btn btn btn-secondary" style={{display:'inside-block'}} >SALVAR</button>
                    </div>
                </form>
            </div>
            
        </div>
    )
}

export default MyData;