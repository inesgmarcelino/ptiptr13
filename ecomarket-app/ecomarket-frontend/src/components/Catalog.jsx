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
        <div id="mobile-filter">
 
        <div class="border-bottom pb-2 ml-2">
        <h4 id="burgundy">Filters</h4>
    </div>
    <div class="py-2 border-bottom ml-3">
        <h6 class="font-weight-bold">Categories</h6>
        <div id="orange"><span class="fa fa-minus"></span></div>
        <form>
            <div class="form-group">
                <input type="checkbox" id="artisan">
                <label for="artisan">Fresh Artisan Breads</label>
            </div>
            <div class="form-group">
                <input type="checkbox" id="breakfast">
                <label for="breakfast">Breakfast Breads</label>
            </div>
            <div class="form-group">
                <input type="checkbox" id="healthy">
                <label for="healthy">Healthy Breads</label>
            </div>                                
        </form>
    </div>
    <div class="py-2 border-bottom ml-3">
        <h6 class="font-weight-bold">Accompainments</h6>
        <div id="orange"><span class="fa fa-minus"></span></div>
        <form>
            <div class="form-group">
                <input type="checkbox" id="tea">
                <label for="tea">Tea Cakes</label>
            </div>
            <div class="form-group">
                <input type="checkbox" id="cookies">
                <label for="cookies">Cookies</label>
            </div>
            <div class="form-group">
                <input type="checkbox" id="pastries">
                <label for="pastries">Pastries</label>
            </div>                                
            <div class="form-group">
                <input type="checkbox" id="dough">
                <label for="dough">Cookie Dough</label>
            </div>                                
            <div class="form-group">
                <input type="checkbox" id="choco">
                <label for="choco">Chocolates</label>
            </div>                                
        </form>
    </div>
    <div class="py-2 ml-3">
        <h6 class="font-weight-bold">Top Offers</h6>
        <div id="orange"><span class="fa fa-minus"></span></div>
        <form>
            <div class="form-group">
                <input type="checkbox" id="25off">
                <label for="25">25% off</label>
            </div>
            <div class="form-group">
                <input type="checkbox" id="5off">
                <label for="5off" id="off">5% off on artisan breads</label>
            </div>                                           
        </form>
    </div>
</div>
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
