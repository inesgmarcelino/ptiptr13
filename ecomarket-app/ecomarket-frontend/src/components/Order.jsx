/* eslint-disable no-multi-str */
import Axios from "axios";
import React, {useState} from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from "react-router-dom";

function Order(){
    const { user, isLoading }   = useAuth0();
    let { id }                  = useParams();
    const [papel, setPapel]     = useState();
    const [prodOK, setPOK]      = useState(false);
    const [cancelar, setCancelar]   = useState(true);
    var url = (process.env.REACT_APP_TEST === "true") ? process.env.REACT_APP_TEST_IP : process.env.REACT_APP_DOMAIN;

    // document.body.onload = function(){prod()};
    const getsUser = () => {
        Axios.get(url+"/api/v2/users", {
            params: {
                email: user.email
            }}).then((response) => {
            if (response.data.message !== 'fail') {
                setPapel(response.data.results[0].papel);
            }
        });
    }

    const prod = () => {
        Axios.get(url+"/api/v1/products/order", {
            params: {
                order: id
        }}).then ((response) => {
            if (response.data.message !== "fail") {
                var produtos = response.data.results;
                for (var i = 0; i < produtos.length; i++) {
                    document.getElementById("linhas").innerHTML += "<tr>\
                                                                        <th>"+produtos[i].id+"</th>\
                                                                        <th>"+produtos[i].nome+"</th>\
                                                                        <th>"+produtos[i].quant+"</th>\
                                                                        <th>"+produtos[i].total+"€</th>\
                                                                    </tr>";
                }
                if (user.email === produtos[0].forn) {
                    setCancelar(false);
                }
            }
        });
        setPOK(true);
    }

    const cancela = () => {;
        if (cancelar) {
            return (<button type="submit" id="remove" name="delete" onClick={cancel} className="btn btn2 d-inline-flex flex-row-reverse">Cancelar</button>);
        }
    }

    const cancel = () => {
        Axios.delete(url+"/api/v1/consumers/cancel", { 
            params: {
                id: id
            }}).then ((response) => {
            console.log(response);
            if (response.data.message === "success") {
                window.location = "/consumer";
            }
        });
    }

    if (isLoading) {
        return (<div></div>);
    } else {
        getsUser();

        if (!prodOK) {
            prod();
        }

        return(
            <div className="showItems">
            <div className='container'>
            <section className='product-details'>
                <div className="details">
                    <div className="container">
                        <h2 className="product-brand">Encomenda {id}</h2>
                        <br />   
                    </div>
                   
                    <div className="container">
                        <table className="table table-bordered" id='centrar'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Produto</th>
                                    <th>Quantidade</th>
                                    <th>Valor</th>
                                </tr>
                            </thead>
                            <tbody id ="linhas">
                            </tbody>
                        </table>
                    </div>
                    {cancela()}
                </div>
            </section>
            </div>
            </div>
        );
    }
}

export default Order;