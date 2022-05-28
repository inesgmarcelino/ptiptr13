import React from 'react'

function Payment () {

    return(
        <div className="card position-absolute top-50 start-50 translate-middle">
            <div className="container">
                <br />
                <h3>Pagamento</h3>     
            <br />
            <div className="container" id='tableCon'>
                <form method="post" id='formPagamento'>
                    <div className="col-md-12">
                        <label>Número do cartão: 
                            <input className="form-control" type="text" name="numero_cartao" placeholder="Número do Cartão" size="50" /* onChange={handler} required */ />
                        </label>
                    </div> 
                    <div className="col-md-12">
                        <label>CVV:
                            <input className="form-control" type="CVV" name="CVV" placeholder="CVV" size="50" />
                        </label>
                    </div>
                    <div className="col-md-12">
                        <label>Data de Validade:
                            <input className="form-control" type="Data_validade" name="data_validade" placeholder="MM/AAAA" size="50" />
                        </label>
                    </div>
                    <div className="col-md-12">
                        <label>Nome no Cartão:
                            <input className="form-control" type="Nome no Cartão" name="Nome no Cartão " placeholder="Nome no Cartão" size="50" />
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