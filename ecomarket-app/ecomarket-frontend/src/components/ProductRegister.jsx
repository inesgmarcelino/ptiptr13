function ProductRegister(){
    return(
        <div>
        <div className="cardForn pr position-absolute top-50 start-50 translate-middle">
            <div className="card-body">
                <h5 className="card-title">FORNECEDOR:</h5>
                <h6 className="card-subtitle mb-2">Registe aqui os aspetos gerais do Produto</h6>
                <form method="post">
                    <div className="col-md-12">
                        <label>Nome do Produto:</label>
                        <input className="form-control" type="text" name="nome"  size="50"/>
                    </div>
                    <div className="col-md-12">
                        <label>Data de Produção:</label>
                        <input className="form-control" type="text" name="zona" placeholder="DD/MM/AAAA"  size="50"/>
                    </div>
                        
                    <div className="col-md-12">
                        <label>Preço Unitário:</label>
                        <input className="form-control" type="text" name="preco"  size="50"/>
                    </div>

                    <div className="col-md-12">
                        <label>Tipo</label>
                        <input className="form-control" type="text" name="tipo"  size="50" />
                    </div>

                    <div className="col-md-12">
                        <label>SubTipo</label>
                        <input className="form-control" type="text" name="subtipo"  size="50" />
                    </div>
                    
                    <h6 className="card-subtitle2 mb-2">Recursos</h6>

                    <div className="col-md-12">
                        <label>Nome:</label>
                        <input className="form-control" type="text" name="nomeR"  size="50"/>
                    </div>

                    <div className="col-md-12">
                        <label>Medida:</label>
                        <input className="form-control" type="text" name="medidaR" size="50"/>
                    </div>

                    <div className="col-md-12">
                        <label>Quantidade:</label>
                        <input className="form-control" type="text" name="quantidadeR" size="50"/>
                    </div>
                
                    <h6 className="card-subtitle2 mb-2">Poluição</h6>

                    <div className="col-md-12">
                        <label>Nome:</label>
                        <input className="form-control" type="text" name="nomeP" size="50"/>
                    </div>

                    <div className="col-md-12">
                        <label>Quantidade:</label>
                        <input className="form-control" type="text" name="quantidadeP"  size="50"/>
                    </div>
                        
                         
                    <button id="submit" type="submit" name="submit" className="btn">Registar</button>
                </form>
            </div>
        </div> 
        </div>
    );
}

export default ProductRegister;