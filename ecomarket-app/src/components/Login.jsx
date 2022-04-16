import React from "react";

function Login() {
    return (
        <div className="col-8 justify-content-center mt-5">
            <div class="form-holder">
                <div class="form-content position-absolute translate-middle">
                    <div class="form-items">
                        <h3>LOGIN</h3>
                        <p>Inicie sessão aqui.</p>
                        <form className="" action="#" method="post">
                            <div class="col-md-12">
                                <label>Email: </label>
                                <input class="form-control" type="email" name="email" required />
                            </div>
                            <div class="col-md-12">
                                <label>Password: </label>
                                <input class="form-control" type="password" name="password" required />
                            </div>
                            
                            <button id="submit" type="submit" class="btn">Iniciar Sessão</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;