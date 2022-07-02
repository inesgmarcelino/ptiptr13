/* eslint-disable no-multi-str */
import React from 'react';
import Axios from "axios";

function Album(){
    const tp = 2;
    const st = null;
    document.body.onload = function(){prods()};
    var url = (process.env.REACT_APP_TEST === "true") ? process.env.REACT_APP_TEST_IP : process.env.REACT_APP_DOMAIN;
    const prods = () => {
        var url = (process.env.REACT_APP_TEST === "true") ? process.env.REACT_APP_TEST_IP : process.env.REACT_APP_DOMAIN;
        Axios.get(url+"/api/v1/products/get", {
            params: {
                tipo: tp,
                subtipo: st
            }
        }).then((response) => {
            if (response.data.message !== 'fail') {
                var lista = response.data.results;
                var i = Math.floor(lista.length/3);
                var j = lista.length%3;

                for (var k = 0; k < lista.length; k++) {
                    if (i > 0 && k+2 < lista.length) {
                        document.getElementById("produtos").innerHTML += "<div className='row mx-5'> \
                                                                            <div className='card mb-3'>\
                                                                                <div className='product-info'>\
                                                                                    <h2 className='product-name'>"+lista[k].nome+"</h2>\
                                                                                    <p className='product-short-des'>"+lista[k].fornecedor+"</p>\
                                                                                    <span className='price'>"+lista[k].preco+"</span>\
                                                                                </div>\
                                                                            </div>\
                                                                            <div className='card mb-3'>\
                                                                                <div className='product-info'>\
                                                                                    <h2 className='product-name'>"+lista[k+1].nome+"</h2>\
                                                                                    <p className='product-short-des'>"+lista[k+1].fornecedor+"</p>\
                                                                                    <span className='price'>"+lista[k+1].preco+"</span>\
                                                                                </div>\
                                                                            </div>\
                                                                            <div className='card mb-3'>\
                                                                                <div className='product-info'>\
                                                                                    <h2 className='product-name'>"+lista[k+2].nome+"</h2>\
                                                                                    <p className='product-short-des'>"+lista[k+2].fornecedor+"</p>\
                                                                                    <span className='price'>"+lista[k+2].preco+"</span>\
                                                                                </div>\
                                                                            </div>\
                                                                        </div>";
                        i--;
                        k += 2;
                    }

                    // if (i === 0 && j > 0) {
                    //     document.getElementById("produtos").innerHTML += "<div className='row mx-5'> \
                    //                                                         <div className='card mb-3'>\
                    //                                                             <div className='product-info'>\
                    //                                                                 <h2 className='product-name'>"+lista[k].nome+"</h2>\
                    //                                                                 <p className='product-short-des'>"+lista[k].fornecedor+"</p>\
                    //                                                                 <span className='price'>"+lista[k].preco+"</span>\
                    //                                                             </div>\
                    //                                                         </div>\
                    //                                                         <div className='card mb-3'>\
                    //                                                             <div className='product-info'>\
                    //                                                                 <h2 className='product-name'>"+lista[k].nome+"</h2>\
                    //                                                                 <p className='product-short-des'>"+lista[k].fornecedor+"</p>\
                    //                                                                 <span className='price'>"+lista[k].preco+"</span>\
                    //                                                             </div>\
                    //                                                         </div>\
                    //                                                     </div>";
                    //     j--;
                    // }
                }
            }
        })
    }


    return(
        <div>
            <div className='row catalog'>
                <div className='col-sm-3 filtros'>
                    <h5>Categoria</h5>
                    <div className="form-check">
                        <input className="form-check-input cat" type="checkbox" id="check-brinquedos" name="check-brinquedos"  />
                        <label className="form-check-label" htmlFor="check-brinquedps">Brinquedos</label>
                        <br />
                        <input className="form-check-input cat" type="checkbox" id="check-livros" name="check-livros"/>
                        <label className="form-check-label" htmlFor="check-livros">Livros</label>
                        <br />
                        <input className="form-check-input cat" type="checkbox" id="check-comida" name="check-comida"  />
                        <label className="form-check-label" htmlFor="check-comida">Comida</label>
                    </div>
                </div>
                <div className="col product-container" id="produtos">
                </div>
            </div>
        </div>
    );

}

export default Album;
