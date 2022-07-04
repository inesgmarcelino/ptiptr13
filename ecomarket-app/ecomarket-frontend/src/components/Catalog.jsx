/* eslint-disable no-multi-str */
import { useState } from "react";
import Axios from "axios";

function Catalog(){
    const [cat, setCat] = useState('');
    const [subcat, setSubcat] = useState('');
    var catsId = [];

    var url = (process.env.REACT_APP_TEST === "true") ? process.env.REACT_APP_TEST_IP : process.env.REACT_APP_DOMAIN;
    document.body.onload = function(){catalog()};

    const catalog = () => {
        prods();
        // filtros();
    }

    const handler = (x) => {
        console.log("entrei")
        switch(x.target.name) {
            case "categoria":
                catsId.forEach((id) => {
                    if (id !== x.target.value && document.getElementById("categoria"+x.target.value).checked) {
                        document.getElementById("categoria"+id).disabled = true;
                    } else if (id !== x.target.value && !document.getElementById("categoria"+x.target.value).checked) {
                        document.getElementById("categoria"+id).disabled = false;
                    }
                })
                break;
            default:
                console.log();
                break;
        }
    }

    const filtros = () => {
        Axios.get(url+"/api/v1/gets/categorias").then((response) => {
            if (response.data.message !== "fail") {
                var cats = response.data.results;
                var result = '';
                for (var i = 0; i < cats.length; i++) {
                    if (i === 0) {
                        result =   <div className= "col-md-12"> 
                                        <input className="form-check-input cat" type="checkbox" id="categoria'+cats[i].id+'" name="categoria" value="'+cats[i].id+'" onChange={handler} /> 
                                        <label className="form-check-label" htmlFor="categoria">' + cats[i].nome + '</label> 
                                        <div id="'+ cats[i].id +'"></div> 
                                    </div>;
                    } else {
                        result +=   <div className= "col-md-12"> 
                                        <input className="form-check-input cat" type="checkbox" id="categoria'+cats[i].id+'" name="categoria" value="'+cats[i].id+'" onChange={handler} /> 
                                        <label className="form-check-label" htmlFor="categoria">' + cats[i].nome + '</label> 
                                        <div id="'+ cats[i].id +'"></div> 
                                    </div>;
                    }
                    catsId.push(cats[i].id);
                }
            }
            return result;
        });
    }

    


    const prods = () => {
        Axios.get(url+"/api/v1/products", {
            params: {
                // tipo: tp,
                // subtipo: st
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
                <div className='col-sm-3 mx-4 p-4 filtros border-top border-start'>
                    <h4><img src="https://img.icons8.com/ios-filled/50/000000/empty-filter.png" id ="icon" alt=""/>Filtros</h4>
                    <div className="form-check" id="filtros">
                    </div>
                </div>
                <div className="col product-container" id="produtos">
                    {filtros()}
                </div>
            </div>
        </div>
    );

}

export default Catalog;
