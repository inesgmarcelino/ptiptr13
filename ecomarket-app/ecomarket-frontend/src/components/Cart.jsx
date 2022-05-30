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
        <div className="shopping-cart">
  
            <div className="title">
            Shopping Bag
            </div>
 
            {/* Product #1  */}
            <div className="item">
 
                <div className="image">
                    <img src={img1} alt="" />
                </div>
 
                <div className="description">
                    <span>Cereais Chocolate</span>
                    <span>Chocolate Negro</span>
                    <span>Continente</span>
                </div>
 
                <div className="quantity">
                    <button className="plus-btn1" type="button" name="button">
                        <img src={img3} alt=""/>
                    </button>
                    <input type="text" name="name" value="1"/>
                    <button className="minus-btn1" type="button" name="button">
                        <img src={img4} alt=""/>
                    </button>
                </div>
 
                <div className="total-price">1euro</div>
            </div>
 
            {/* Product #2 --> */}
            <div className="item">
                <div className="image">
                    <img src={img2} alt=""/>
                </div>
 
                <div className="description">
                    <span>Cereais Golden Graham</span>
                    <span>Mel</span>
                    <span>Nestlé</span>
                </div>
 
                <div className="quantity">
                    <button className="plus-btn1" type="button" name="button">
                        <img src={img3} alt=""/>
                    </button>
                    <input type="text" name="name" value="1"/>
                    <button className="minus-btn1" type="button" name="button">
                        <img src={img4} alt="" />
                    </button>
                </div>
 
                <div className="total-price">3 euros</div>
            </div>
 
 
        </div>
    );
}

export default Cart;