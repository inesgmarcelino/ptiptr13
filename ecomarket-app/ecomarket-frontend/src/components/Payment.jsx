import React from 'react'

function Payment () {

    return(
        <div className="payment" style={{position:'relative', display:'flex'}}>´
            <div className="container">
                <br />
                <h3>Pagamento</h3>     
            <br />
            <div className="container" style={{textAlign : 'center'}}>
                <form method="post" style={{display: 'inline-block'}}>
                        <label>Email ou Número de Telemóvel: 
                            <input className="form-control" type="text" name="email_telemovel" placeholder="Email ou número de telemóvel" size="50" /* onChange={handler} required */ />
                        </label>
                    <div className="col-md-12">
                        <label>Palavra-passe :
                            <input className="form-control" type="password" name="palavra-chave" placeholder="Palavra-chave" size="50" />
                        </label>
                    </div>
                    <br />
                    <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                        <input type="hidden" name="cmd" value="_s-xclick" />
                        <input type="hidden" name="hosted_button_id" value="7C2N89GFR45WS"/>
                        <input type="image" src="https://www.paypalobjects.com/pt_PT/PT/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal - A forma mais fácil e segura de efetuar pagamentos online!" />
                        <img alt="" border="0" src="https://www.paypalobjects.com/pt_PT/i/scr/pixel.gif" width="1" height="1" />
                    </form>

                </form>
            </div>
            </div>
        </div>
        
    )
}
    
export default Payment;