/* eslint-disable no-multi-str */
import React from 'react';
import Axios from "axios";

function Album(){
    const tp = 2;
    const st = null;
    document.body.onload = function(){prods()};

    const prods = () => {
        Axios.get("https://ecomarket.works/api/v1/products/get", {
            params: {
                tipo: tp,
                subtipo: st
            }
        }).then((response) => {
            if (response.data.message !== 'fail') {
                var lista = response.data.results;
                var i = Math.floor(lista.length/3);
                var j = lista.length%3;

                for (var k = 0; k < lista; k++) {
                    if (i > 0) {
                        document.getElementById("produtos").innerHTML += "<div className=row mx-5'> \
                                                                            <div className='card mb-3'>\
                                                                                <div className='product-info'>\
                                                                                    <h2 className='product-name'>"+lista[k].nome+"</h2>\
                                                                                    <p className='product-short-des'>"+lista[k].fornecedor+"</p>\
                                                                                    <span className='price'>"+lista[k].preco+"</span>\
                                                                                </div>\
                                                                            </div>\
                                                                            <div className='card mb-3'>\
                                                                                <div className='product-info'>\
                                                                                    <h2 className='product-name'>"+lista[k].nome+"</h2>\
                                                                                    <p className='product-short-des'>"+lista[k].fornecedor+"</p>\
                                                                                    <span className='price'>"+lista[k].preco+"</span>\
                                                                                </div>\
                                                                            </div>\
                                                                        </div>";
                    }
                }
            }
        })
    }


    return(
        <div>
            <div className="product-container" id="produtos">
            </div>
        </div>
    );

}

export default Album;
