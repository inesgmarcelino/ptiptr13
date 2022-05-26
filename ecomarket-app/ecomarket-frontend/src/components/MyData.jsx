import React from 'react'
import {Link } from "react-router-dom";

function MyData () {

    /* const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [tele, setTele] = useState('');
    const [pass, setPass]  = useState('');
    const [checkPassword, setCheckPassword] = useState('');

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
            case "checkPassword":
                setCheckPassword(x.target.value);
                break;
            case "submit":
                x.preventDefault();
                if (nome === '' || email === '' || tele === '' || pass === '' || checkPassword === '' ||
                    // verificar passwords
                    (pass !== checkPassword)){
                        // setError(true);
                }else{

                }


        }
    } */

    return(
        <div>
            <div className="card position-absolute top-50 start-50 translate-middle">
                <div className="card-body">
                    <h5 className="card-title">Editar Dados</h5>
                    <h6 className="card-subtitle mb-2">Altere aqui os dados</h6>
                    <form method="post">
                             <div className="col-md-12">
                                 <input className="form-control" type="text" name="nome" placeholder="Nome Completo"  />
                             </div>
                             <div className="col-md-12">
                                 <input className="form-control" type="email" name="email" placeholder="Email"  />
                             </div>
                             <div className="col-md-12">
                                 <input className="form-control" type="text" name="nif" placeholder="NIF" />
                             </div>
                             <div className="col-md-12">
                                 <input className="form-control" type="text" name="telem" placeholder="Número de Telemóvel" />
                             </div>
                             <div className="col-md-12">
                                 <input className="form-control" type="password" name="password" placeholder="Password"/>
                             </div>
                             <div className="col-md-12">
                                 <input className="form-control" type="password" name="checkPassword" placeholder="Confirme a Password" />
                             </div>
                             
                            
                             <button id="submit" type="submit" name="submit" className="btn">Guardar</button>
                         </form>
                </div>
            </div>
        </div>
    
                
            
        
        
    )
}

export default MyData;