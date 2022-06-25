
function AdminUsersList(){

    return(
        <div className="position-absolute showItems">
            <div className="container">
                <h3>Utilizadores</h3>     
            </div>
            <br />
            <div className="container">
            <table className="table table-bordered" id='centrar'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>NIF</th>
                        <th>Contacto</th>
                        <th>Produtor</th>
                        <th>Consumidor</th>
                        <th>Transportador</th>
                        <th>-- --</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Aqui colocar um for que tem tantas linhas como o numero de users */}
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <div class="d-flex justify-content-center"> 
                            {/* reencaminhar para uma página onde o admin consiga alterar os dados dos users */}
                            <td><Link to ='/EditProfile'> <button type="button" class="btn btn-success">Editar</button></Link></td>
                        </div>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default AdminUsersList;