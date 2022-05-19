import React from 'react'

function ShoopingCart () {

    return(
        <div>
            
            <div className="payment" style={{position:'relative', display:'flex'}}>
                
                <div className="container">
                    <br />
                    <h3>Cesto de Compras</h3>     
                    <br />
                    
                    <div className="col-md-12">
                        <img></img>
                        <h5> Farinha Branca de Neve </h5>
                        <input type="number"  name="quantidade" size="1" />
                    </div>

                    <div className="subtotal"> 
                        <h3>Subtotal</h3>
                        <div className="container">
                            <h5 className="text-uppercase">items 3</h5>
                            <h5>€ 132.00</h5>
                            <button type="button" className="btn btn btn-primary" >Finalizar compra</button>
                        </div>
                        
                    </div>

                
                </div>

            </div>

            </div>



        
    )
}
    
export default ShoopingCart;