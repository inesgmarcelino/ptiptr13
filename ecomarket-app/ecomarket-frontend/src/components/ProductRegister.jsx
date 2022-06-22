/* eslint-disable no-multi-str */
import { useState } from "react";
import Axios from 'axios';

function ProductRegister(){

    const [nomeProd, setNomeProd]   = useState('');
    const [dataProd, setDataProd]   = useState('');
    const [preco, setPreco]         = useState('');
    const [tipo, setTipo]           = useState('');
    const [subtipo, setSubtipo]     = useState('');
    const [nomeRec, setNomeRec]     = useState('');
    const [medidaRec, setMedRec]    = useState('');
    const [quantRec, setQuantRec]   = useState('');
    const [nomePol, setNomePol]     = useState('');
    const [quantPol, setQuantPol]   = useState('');

    // const addRec = () => {
    //     document.getElementsByClassName("recursos").innerHTML += "<div className='col-md-12'> \
    //     <label>Nome:</label>\
    //     <input className='form-control' type='text' name='nomeR'  size='50'/>\
    // </div>\
    // <div className='col-md-12'>\
    //     <label>Medida:</label>\
    //     <input className='form-control' type='text' name='medidaR' size='50'/>\
    // </div>\
    // <div className='col-md-12'>\
    //     <label>Quantidade:</label>\
    //     <input className='form-control' type='text' name='quantidadeR' size='50'/>\
    // </div>";
    // }

    // const addPol = () => {
    //     document.getElementsByClassName("poluicao").innerHTML += "<div className='col-md-12'>\
    //     <label>Nome:</label>\
    //     <input className='form-control' type='text' name='nomeP' size='50'/>\
    // </div>\
    // <div className='col-md-12'>\
    //     <label>Quantidade:</label>\
    //     <input className='form-control' type='text' name='quantidadeP'  size='50'/>\
    // </div>";
    // }

    const handler = (x) => {
        switch(x.target.name) {
            case "nomeProd":
                setNomeProd(x.target.value);
                break;
            case "dataProd":
                setDataProd(x.target.value);
                break;
            case "preco":
                setPreco(x.target.value);
                break;
            case "tipo":
                setTipo(x.target.value);
                break;
            case "subtipo":
                setSubtipo(x.target.value);
                break;
            case "submit":
                x.preventDefault();
                if (nomeProd === '' || dataProd === '' || preco === '' || tipo === '' || subtipo === '') {
                    // setError(true);
                } else {
                    Axios.post("https://ecomarket.works/api/v1/providers/reg_product", {
                        // id: id
                        nome: nomeProd,
                        data: dataProd,
                        preco: preco,
                        tipo: tipo,
                        subtipo: subtipo
                    }).then((response) => {
                        console.log(response);
                    })
                }
                break;
            default:
                console.log();
            
        }
    }

    return(
        <div>
        <div className="cardForn pr position-absolute top-50 start-50 translate-middle">
            <div className="card-body">
                <h5 className="card-title">FORNECEDOR:</h5>
                <h6 className="card-subtitle mb-2">Registe aqui os aspetos gerais do Produto</h6>
                <form method="post">
                    <div className="col-md-12">
                        <label>Nome do Produto:</label>
                        <input className="form-control" type="text" name="nomeProd"  size="50" onChange={handler} required/>
                    </div>
                    <div className="col-md-12">
                        <label>Data de Produção:</label>
                        <input className="form-control" type="date" name="dataProd" placeholder="DD/MM/AAAA"  size="50" onChange={handler} required/>
                    </div>
                        
                    <div className="col-md-12">
                        <label>Preço Unitário:</label>
                        <input className="form-control" type="text" name="preco"  size="50" onChange={handler} required/>
                    </div>

                    <div className="col-md-12">
                        <label>Tipo</label>
                        <input className="form-control" type="text" name="tipo"  size="50"  onChange={handler} required/>
                    </div>

                    <div className="col-md-12">
                        <label>Subtipo</label>
                        <input className="form-control" type="text" name="subtipo"  size="50"  onChange={handler} required/>
                    </div>
                    
                    <h6 className="card-subtitle2 mb-2">Recursos</h6>
                    <div className="recursos">
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
                    </div>
                     <input type="button">Adicionar</input> {/*onClick={addRec} */}
                
                    <h6 className="card-subtitle2 mb-2">Poluição</h6>
                    <div className="poluicao">
                        <div className="col-md-12">
                            <label>Nome:</label>
                            <input className="form-control" type="text" name="nomeP" size="50"/>
                        </div>
                        <div className="col-md-12">
                            <label>Quantidade:</label>
                            <input className="form-control" type="text" name="quantidadeP"  size="50"/>
                        </div>
                    </div>
                     <input type="button" >Adicionar</input> {/*onClick={addPol} */}
                         
                    <button id="submit" type="submit" name="submit" className="btn" onChange={handler}>Registar</button>
                </form>
            </div>
        </div> 
        </div>
    );
}

export default ProductRegister;