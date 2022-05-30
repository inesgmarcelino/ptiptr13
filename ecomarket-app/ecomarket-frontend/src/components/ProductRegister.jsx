function ProductRegister(){
    return(
        <div>
        <div className="cardForn pr position-absolute top-50 start-50 translate-middle">
            <div className="card-body">
                <h5 className="card-title">FORNECEDOR:</h5>
                <h6 className="card-subtitle mb-2">Registe aqui os aspetos gerais do Produto</h6>
                <form method="post">
                    <div className="col-md-12">
                        <label>Nome do Produto:
                            <input className="form-control" type="text" name="nome" placeholder="Nome Produto" size="50"/>
                        </label>
                    </div>
                    <div className="col-md-12">
                        <label>Data de Produção:
                            <input className="form-control" type="text" name="zona" placeholder="DD/MM/AAAA"  size="50"/>
                        </label>
                    </div>
                        
                    <div className="col-md-12">
                        <label>Preço Unitário:
                            <input className="form-control" type="text" name="preco" placeholder="Preço Unitário" size="50"/>
                        </label>
                    </div>

                    <div className="col-md-12">
                        <label>Tipo
                            <input className="form-control" type="text" name="tipo" placeholder="Tipo" size="50" />
                        </label>
                    </div>

                    <div className="col-md-12">
                        <label>SubTipo
                            <input className="form-control" type="text" name="subtipo" placeholder="Subtipo" size="50" />
                        </label>
                    </div>
                    
                    <h6 className="card-subtitle2 mb-2">Recursos</h6>

                    <div className="col-md-12">
                        <label>Nome:
                            <input className="form-control" type="text" name="nomeR" placeholder="Nome" size="50"/>
                        </label>
                    </div>

                    <div className="col-md-12">
                        <label>Medida:
                            <input className="form-control" type="text" name="medidaR" placeholder="Medida" size="50"/>
                        </label>
                    </div>

                    <div className="col-md-12">
                        <label>Quantidade:
                            <input className="form-control" type="text" name="quantidadeR" placeholder="Quantidade" size="50"/>
                        </label>
                    </div>
                
                    <h6 className="card-subtitle2 mb-2">Poluição</h6>

                    <div className="col-md-12">
                        <label>Nome:
                            <input className="form-control" type="text" name="nomeP" placeholder="Nome" size="50"/>
                        </label>
                    </div>

                    <div className="col-md-12">
                        <label>Quantidade:
                            <input className="form-control" type="text" name="quantidadeP" placeholder="Quantidade" size="50"/>
                        </label>
                    </div>
                        
                         
                    <button id="submit" type="submit" name="submit" className="btn">Registar</button>
                </form>
            </div>
        </div> 
        </div>
    );
}

export default ProductRegister;