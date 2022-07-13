/* eslint-disable no-multi-str */
import Axios from 'axios';
import { useState } from "react";
import {Link } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';


function ProductRegister() {
    var url = (process.env.REACT_APP_TEST === "true") ? process.env.REACT_APP_TEST_IP : process.env.REACT_APP_DOMAIN;
    const { user, isLoading }   = useAuth0();

    const [pid, setPID]         = useState('');
    const [papel, setPapel]     = useState('');

    if (isLoading) {
        return (<div></div>);
    } else {
        const getsUser = () => {
            Axios.get(url+"/api/v2/users", {
                params: {
                  email: user.email
              }}).then((response) => {
                if (response.data.message !== 'fail') {
                  setPapel(response.data.results[0].papel)
                  setPID(response.data.results[0].id);
                }
              });
        }

        getsUser();

        if (papel === 3 || papel === 4) {

            return (<div className="cardForn position-absolute top-50 start-50 translate-middle pr3" id="card">
                        <div className="card-body">
                            <h5 className="card-title">FORNECEDOR:</h5>
                            <h6 className="card-subtitle mb-2">Pertende fazer um registo?</h6>
                            <div className="col-md-12">
                                <label className="form-check-label" htmlFor="check-existe">O produto já existe?</label>
                                <Link to ='/productExists' ><button className="btn btn2">Sim</button></Link>
                                <Link to ='/newProduct' ><button className="btn btn2">Não</button></Link>
                            </div>
                        </div>
                    </div>);
        }
    }
}

export default ProductRegister;