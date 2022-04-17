import React, { useState } from "react";

function Login() {

    // states for login
    const [email, setEmail]         = useState('');
    const [password, setPassword]   = useState('');

    // states for checking errors
    const [submitted, setSubmitted] = useState(false);
    const [error,setError] = useState(false);

    const handler = (x) => {
        switch(x.target.name) {
            case "email":
                setEmail(x.target.value);
                setSubmitted(false);
                break;
            case "password":
                setPassword(x.target.value);
                setSubmitted(false);
                break;
            case "submit":
                x.preventDefault();
                if ( email === '' || password === '') {
                        setError(true);
                } else {
                    setSubmitted(true);
                    setError(false);
                }
                break;
            default:
                console.log();
        }
    }

    // showing error message if error true
    const errorMessage = () => {
        return (
            <div className="error" style={{display: error ? '' : 'none'}}>
                <h1>Please enter all the fields</h1>
            </div>
        );
    };

    return (
        <div className="col-8 justify-content-center mt-5">
            <div class="form-holder">
                <div class="form-content position-absolute">
                    <div class="form-items">
                        <h3>LOGIN</h3>
                        <p>Inicie sessão aqui.</p>

                        <div className="messages">
                            {errorMessage()}
                        </div>

                        <form>
                            <div class="col-md-12">
                                <label>Email: </label>
                                <input class="form-control" type="email" name="email" onChange={handler} required />
                            </div>
                            <div class="col-md-12">
                                <label>Password: </label>
                                <input class="form-control" type="password" name="password" onChange={handler} required />
                            </div>
                            
                            <button id="submit" type="submit" name="submit" onClick={handler} class="btn">Iniciar Sessão</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;