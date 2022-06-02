import React from 'react'

function AdminTipos () {

    return(
        <div>
            <div className="card position-absolute top-50 start-50 translate-middle">
                <div className="card-body">
                    <h5 className="card-title">Admin - Registar Tipos e Subtipos</h5>
                    {/* <h6 className="card-subtitle mb-2">Altere aqui os dados</h6> */}
                    <form method="post">
                            <div className="col-md-12">
                                <label>Tipo</label>
                                <input className="form-control" type="text" name="tipo" size="50"  />
                            </div>
                            <div className="col-md-12">
                                <label>Subtipo</label>
                                <input className="form-control" type="text" name="subtipo" size="50"  />
                            </div>
                             
                            
                            <button id="submit" type="submit" name="submit" className="btn">Criar</button>
                            {/* <button id='remove'className='btn'> Remover Conta</button> */}
                        </form>
                </div>
            </div>
        </div>
    );
}

export default AdminTipos;