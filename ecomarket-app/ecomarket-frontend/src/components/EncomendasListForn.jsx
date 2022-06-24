function EncomendasListForn () {

    

    return(
        <div className="position-absolute showItems">
            <div className="container">
                <Link to ='/profile' ><button type="button" className="btn" >Voltar</button></Link>
                <br />
                <h3>Lista de Encomendas</h3>     
            </div>
            <br />
            <div className="container">
            <table className="table table-bordered" id='centrar'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Consumidor</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Aqui colocar um for que tem tantas linhas como o numero de encomendas do fornecedor */}
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    )


}

export default EncomendasListForn;