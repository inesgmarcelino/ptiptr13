import React from "react";
import $ from "jquery";
const img1 = require('../images/cereaisChocolateNegro.jpg')
const img2 = require('../images/cereaisGoldenGraham.jpg')
const img3 = require('../images/plus.png')
const img4 = require('../images/less.png')


function Cart() {
  
    $('.minus-btn1').on('click', function(e) {
        e.preventDefault();
        var $this = $(this);
        var $input = $this.closest('div').find('input');
        var value = parseInt($input.val());
     
        if (value > 1) {
            value = value - 1;
        } else {
            value = 0;
        }
     
      $input.val(value);
     
    });
    // não funcionam bem 
    $('.plus-btn1').on('click', function(e) {
        e.preventDefault();
        var $this = $(this);
        var $input = $this.closest('div').find('input');
        var value = parseInt($input.val());
     
        if (value < 100) {
            value = value + 1;
        } else {
            value =100;
        }
     
        $input.val(value);
    });

    return (
        <div className="container">
        <p className="titulo">Carrinho de Compras</p>
        <div className="shopping-cart">
            <div className="row" >
                <div className="col-sm image">
                    <img src={img1} alt="" />
                </div>
                <div className="col-sm description">
                    <span>Cereais Chocolate</span>
                    <span>Chocolate Negro</span>
                    <span>Continente</span>
                </div>
                <div className="col-sm quantity">
                    <button className="plus-btn1" type="button" name="button">
                        <img src={img3} alt=""/>
                    </button>
                    <input type="text" name="name" value="1"/>
                    <button className="minus-btn1" type="button" name="button">
                        <img src={img4} alt="" />
                    </button>
                </div>
                <div className="col total-price">3€</div>
            </div>

            <div className="row">
                <div className="col image">
                    <img src={img2} alt="" />
                </div>
                <div className="col description">
                    <span>Cereais Golden</span>
                    <span>Mel</span>
                    <span>Nestlé</span>
                </div>
                <div className="col quantity">
                    <button className="plus-btn1" type="button" name="button">
                        <img src={img3} alt=""/>
                    </button>
                    <input type="text" name="name" value="1"/>
                    <button className="minus-btn1" type="button" name="button">
                        <img src={img4} alt="" />
                    </button>
                </div>
                <div className="col total-price">3€</div>
            </div>

    
            <div className="sumprice">Preço total:  6€</div>
            

            <button name="encomendar" className="btn btn2" >Encomendar</button>

        </div>
    </div>
    );
}

export default Cart;