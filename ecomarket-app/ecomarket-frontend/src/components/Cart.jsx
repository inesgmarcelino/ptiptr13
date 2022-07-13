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
        <div>
            <div className="container">
                <p className="titulo">Carrinho de Compras</p>
                <div className="shopping-cart">
                    <table>
                        <tr>
                            <th className="cart">Produto</th>
                            <th className="cart">Quantidade</th>
                            <th className="cart">Preço</th>
                            <th></th>
                        </tr>
                    </table>
                    
                </div>

    
            <div className="sumprice">Preço total: </div>
            

            <button name="encomendar" className="btn btn2" >Encomendar</button>

        </div>
    </div>
    );
}

export default Cart;