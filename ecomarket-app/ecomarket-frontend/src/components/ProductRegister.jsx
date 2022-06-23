/* eslint-disable no-multi-str */
import Axios from 'axios';
import { useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';

function ProductRegister(){
    const { user } = useAuth0();
    const id = 2; //testar forn

    const [nomeProd, setNomeProd]   = useState('');
    const [dataProd, setDataProd]   = useState('');
    const [preco, setPreco]         = useState('');
    const [tipo, setTipo]           = useState('');
    const [subtipo, setSubtipo]     = useState('');
    // const [nomeRec, setNomeRec]     = useState('');
    // const [medidaRec, setMedRec]    = useState('');
    // const [quantRec, setQuantRec]   = useState('');
    // const [nomePol, setNomePol]     = useState('');
    // const [quantPol, setQuantPol]   = useState('');

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
                subtipos();
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
                        id: id,
                        nome: nomeProd,
                        data: dataProd,
                        preco: preco,
                        tipo: tipo,
                        subtipo: subtipo
                    }).then((response) => {
                        console.log(response);
                        // if (response.data.message === "success") {
                        //     window.location.href = "https://ecomarket.works/";
                        // }
                    })
                }
                break;
            default:
                console.log();
            
        }
    }

    const tipos = () => {
        Axios.get("https://ecomarket.works/api/v1/gets/tipos").then((response) => {
            var tip = response.data.results;
            for (var i = 0; i < tip.length; i++) {
                document.getElementById("tipos").innerHTML += "<option value='" + tip[i]["id"] + "'>" + tip[i]["nome"] + "</option>";
            }
        });
    }

    const subtipos = () => {
        document.getElementById("subtipos").innerHTML = "<option value='' selected>Selecione um Subtipo</option>";
        Axios.get("https://ecomarket.works/api/v1/gets/subtipos", { 
            params: { 
                tipo: tipo
        }}).then((response) => {
            var sub = response.data.results;
            for (var i = 0; i < sub.length; i++) {
                document.getElementById("subtipos").innerHTML += "<option value='" + sub[i][0] + "'>" + sub[i][1] + "</option>";
            }
        });
    }

    return(
        <div>
        <div className="cardForn position-absolute top-50 start-50 translate-middle">
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
                        <select className="form-select" name="tipo" id="tipos" onChange={handler} onMouseOver={tipos} required>
                            <option value='' selected>Selecione um Tipo</option>
                        </select>
                    </div>

                    <div className="col-md-12">
                        <label>Subtipo</label>
                        <select className="form-select" name="subtipo" id="subtipos" onChange={handler} required>
                            <option value='' selected>Selecione um Subtipo</option>
                        </select>
                    </div>
                    
                    {/* <h6 className="card-subtitle2 mb-2">Recursos</h6>
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
                     <input type="button">Adicionar</input> onClick={addRec} 
                
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
                     <input type="button" >Adicionar</input> onClick={addPol} */}
                         
                    <button id="submit" type="submit" name="submit" className="btn" onChange={handler}>Registar</button>
                </form>
            </div>
        </div> 
        </div>
    );
}

export default ProductRegister;