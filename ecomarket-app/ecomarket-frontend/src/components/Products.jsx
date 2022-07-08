/* eslint-disable no-multi-str */
import Axios from "axios";

function Products() {
    var url = (process.env.REACT_APP_TEST === "true") ? process.env.REACT_APP_TEST_IP : process.env.REACT_APP_DOMAIN;

    document.body.onload = function(){prods()};

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

                for (var k = 0; k < lista.length; k++) {
                    if (i > 0 && k+2 < lista.length) {
                        document.getElementById("produtos").innerHTML += "<div class='row mx-5'> \
                                                                            <div class='card mb-3 mx-2 product position-relative'>\
                                                                                <div class='product-info'>\
                                                                                    <h2 class='product-name'>"+lista[k].nome+"</h2>\
                                                                                    <p class='product-short-des'>"+lista[k].fornecedor+"</p>\
                                                                                    <span class='price'>"+lista[k].preco+"</span>\
                                                                                </div>\
                                                                            </div>\
                                                                            <div class='card mb-3 mx-2 product position-relative'>\
                                                                                <div class='product-info'>\
                                                                                    <h2 class='product-name'>"+lista[k+1].nome+"</h2>\
                                                                                    <p class='product-short-des'>"+lista[k+1].fornecedor+"</p>\
                                                                                    <span class='price'>"+lista[k+1].preco+"</span>\
                                                                                </div>\
                                                                            </div>\
                                                                            <div class='card mb-3 mx-2 product position-relative'>\
                                                                                <div class='product-info'>\
                                                                                    <h2 class='product-name'>"+lista[k+2].nome+"</h2>\
                                                                                    <p class='product-short-des'>"+lista[k+2].fornecedor+"</p>\
                                                                                    <span class='price'>"+lista[k+2].preco+"</span>\
                                                                                </div>\
                                                                            </div>\
                                                                        </div>";
                        k += 2;
                    } else if (i > 0 && k+1 < lista.length) {
                        document.getElementById("produtos").innerHTML += "<div class='row mx-5'> \
                                                                            <div class='card mb-3 mx-2 product position-relative'>\
                                                                                <div class='product-info'>\
                                                                                    <h2 class='product-name'>"+lista[k].nome+"</h2>\
                                                                                    <p class='product-short-des'>"+lista[k].fornecedor+"</p>\
                                                                                    <span class='price'>"+lista[k].preco+"</span>\
                                                                                </div>\
                                                                            </div>\
                                                                            <div class='card mb-3 mx-2 product position-relative'>\
                                                                                <div class='product-info'>\
                                                                                    <h2 class='product-name'>"+lista[k+1].nome+"</h2>\
                                                                                    <p class='product-short-des'>"+lista[k+1].fornecedor+"</p>\
                                                                                    <span class='price'>"+lista[k+1].preco+"</span>\
                                                                                </div>\
                                                                            </div>";
                        k++;
                    } else if (i > 0 && k < lista.length) {
                        document.getElementById("produtos").innerHTML += "<div class='row mx-5'> \
                                                                            <div class='card mb-3 mx-2 product position-relative'>\
                                                                                <div class='product-info'>\
                                                                                    <h2 class='product-name'>"+lista[k].nome+"</h2>\
                                                                                    <p class='product-short-des'>"+lista[k].fornecedor+"</p>\
                                                                                    <span class='price'>"+lista[k].preco+"</span>\
                                                                                </div>\
                                                                            </div>";
                    }
                }
            }
        });
    }
    
    return (<div className="col" id="produtos"></div>);
}

export default Products;