import React from 'react';
import Axios from "axios";

function Album(){
    const tp = 3;
    const st = 3;
    document.body.onload = function(){};

    const prods = () => {
        Axios.get("https://ecomarket.works/api/products", {
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
                    while 
                }
            }
        })
    }


    return(
        <div class="product-container">
            <div className="row mx-5"> 
                <div className="card mb-3">            
                    <div class="product-info">
                        <h2 class="product-name">brand</h2>
                        <p class="product-short-des">cereais</p>
                        <span class="price">2€</span>
                    </div>
                </div>

                <div className="card mb-3">            
                    <div class="product-info">
                        <h2 class="product-name">continente</h2>
                        <p class="product-short-des">cereais</p>
                        <span class="price">1,5€</span>
                    </div>
                </div>
            </div> 

        

        </div>
    );

}

export default Album;