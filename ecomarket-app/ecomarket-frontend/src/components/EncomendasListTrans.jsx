function EncomendasListTrans () {

    

    return(
        <div className="position-absolute showItems">
            <div className="container">
                <Link to ='/profile' ><button type="button" className="btn" >Voltar</button></Link>
                <br />
                <h3>Lista de veículos</h3>     
            </div>
            <br />
            <div className="container">
            <table className="table table-bordered" id='centrar'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Nome Consumidor</th>
                        <th>Localização da Entrega</th>
                        <th>Data da entrega</th>
                        <th>Veículo Atribuído</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Aqui colocar um for que tem tantas linhas como o numero de encomendas do transportador*/}
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>     
                        <td></td>   
                        <td></td>      
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    )


}

export default EncomendasListTrans;