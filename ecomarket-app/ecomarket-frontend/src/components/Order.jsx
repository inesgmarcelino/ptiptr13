/* eslint-disable no-multi-str */
import React from 'react'
import Axios from "axios";
import {Link } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

function Order(){
    const { user } = useAuth0();
    const order = 1;
    var provider;

    document.body.onload = function(){prod()};

    const prod = () => {
        Axios.get("https://ecomarket.works/api/v1/products/order", {
            params: {
                order: order
        }}).then ((response) => {
            if (response.data.message !== "fail") {
                var produtos = response.data.results;
                for (var i = 0; i < produtos.length; i++) {
                    document.getElementById("linhas").innerHTML += "<tr>\
                                                                        <th>"+produtos[i].id+"</th>\
                                                                        <th>"+produtos[i].nome+"</th>\
                                                                        <th>"+produtos[i].quant+"</th>\
                                                                        <th>"+produtos[i].total+"</th>\
                                                                    </tr>";
                }
            }
        })
    }

    return(
        <div className="position-absolute showItems">
        <div className='container'>
        <section className='product-details'>
            {/* <div className='imageP'>
                {/* <img src={img1} alt='' /> 
            </div> */}

            <div className="details">
                <h2 className="product-brand">Encomenda {order}</h2>
                <span className="product-price">Fornecedor </span>
                {/* lista dos produtos */}
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
            </div>
        </section>
        </div>
        </div>
    );
}

export default Order;