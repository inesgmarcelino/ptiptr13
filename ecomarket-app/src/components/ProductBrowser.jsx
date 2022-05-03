import React, { useState } from "react";
import Axios from "axios";

//Segui o exemplo em https://reactjs.org/docs/components-and-props.html

function ProductBrowser(){
    //codigo para ir buscar ah base de dados
    // codigo da base de dados em principio retornara uma lista de jsons
    // por implementar no backend
    var product1 = {"id" : "1", "name":"Cacho de bananas", "price" : 30, "img": 
"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0206%2F9470%2Ffiles%2FBananas_1024.jpg%3F6417708043688027491&f=1&nofb=1"};
    var product2 = {"id" : "2", "name":"Cacho de uvas","price" : 33, "img":
"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F2.bp.blogspot.com%2F-FRtGQSW_Bhk%2FUUNlaM6M2kI%2FAAAAAAAAA-o%2FsShxcimxn_c%2Fs1600%2Fuvas%2Bimportada.jpg&f=1&nofb=1"};
    var product3 = {"id" : "3", "name":"Cacho de maçãs?","price" : 59, "img": 
"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.yg_oNYr_4bQYdWQjbWISlwHaE6%26pid%3DApi&f=1"};
    var product4 = {"id" : "4", "name":"Cacho de pinapples?","price" : 100, "img": 
"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.agrimall.com.gh%2Fwp-content%2Fuploads%2Fclassified-listing%2F2020%2F05%2F26036083-fresh-pineapple-for-sale-.jpg&f=1&nofb=1"};
    
    //lista de jsons
    var products = [product1,product2,product3,product4];

    /** ESTA FUNCAO REUNE TODOS OS OBJETOS PRODUTOS NUMA LISTA DE
     * REACT ELEMENTS E RETORNA ESSA LISTA PARA IMPRIMIR
     */
    var listprods = function(prods){
        var arr = [];
        for(var prod in prods){
           arr.push(new Product(prods[prod]));
        }
        console.log(arr);
        return arr;
    }

    return(
        <div id="catalog" class="album">
            <div class='productContainer container'>
                <div class='row'>
                    {/**new Product(product1)*/listprods(products)}   
                </div>
            </div> 
        </div>
    );
}

//details is json object
function Product(details/**,func */){
    //passar a func para o onclick

    //este objeto retorna um react.element 
    return (
                <div id={details.id} class='detailWrapper col'>
                    <div class="card">
                        <img src={details.img} class="card-img-top"></img>
                        <div class='detailsContainer card-body'>
                            <p class="name"> {details.name}</p>
                            <p class="price">{details.price}$</p>
                        </div>
                    </div>
                </div>
    );
}

export default ProductBrowser