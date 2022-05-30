
function ArmazemRegister(){
    return(
        <div>
        <div className="cardForn position-absolute top-50 start-50 translate-middle">
            <div className="card-body">
                <h5 className="card-title">FORNECEDOR:</h5>
                <h6 className="card-subtitle mb-2">Registe aqui o armazém</h6>
                <form method="post">
                         <div className="col-md-12">
                             <input className="form-control" type="text" name="morada" placeholder="Morada"  />
                         </div>
                         <div className="col-md-12">
                             <input className="form-control" type="text" name="codigoPostal" placeholder="Código-Postal" />
                         </div>
                         <div className="col-md-12">
                             <input className="form-control" type="text" name="distrito" placeholder="Distrito"/>
                         </div>
                         <div className="col-md-12">
                             <input className="form-control" type="text" name="concelho" placeholder="Concelho"  />
                         </div>
                    
                    
                        
                         <button id="submit" type="submit" name="submit" className="btn">Registar</button>
                     </form>
            </div>
        </div> 
        </div>
    );
}

export default ArmazemRegister;