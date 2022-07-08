/* eslint-disable no-multi-str */
import { useState } from "react";
import Axios from "axios";

function Filtros() {
    var url = (process.env.REACT_APP_TEST === "true") ? process.env.REACT_APP_TEST_IP : process.env.REACT_APP_DOMAIN;
    const [cat, setCat]         = useState('');
    const [subcat, setSubcat]   = useState('');
    var catsId = [];

    document.body.onload = function(){categorias()};

    const handler = (x) => {
        switch(x) {
            case "submit":
                x.preventDefault();
                for (var i = 0; i < catsId.length; i++) {
                    if (document.getElementById("categoria"+catsId[i]).checked) {
                        setCat(catsId[i]);
                    } 
                }

                if (cat !== '') {
                    for (var j = 0; j < catsId.length; j++) {
                        if (catsId[j] !== cat) {
                            document.getElementById("categoria"+catsId[j]).disabled = true;
                        } 
                    }
                    // subcategorias();
                }
                break;
            case "submit2":
                break;
            default:
                console.log();
        }
    }

    const categorias = () => {
        Axios.get(url+"/api/v1/gets/categorias").then((response) => {
            if (response.data.message !== "fail") {
                var cats = response.data.results;
                for (var i = 0; i < cats.length; i++) {
                    document.getElementById("categorias").innerHTML +=   '<div className= "col-md-12"> \
                                    <input className="form-check-input cat" type="checkbox" id="categoria'+cats[i].id+'" name="categoria" /> \
                                    <label className="form-check-label">' + cats[i].nome + '</label> \
                                    <div id="'+ cats[i].id +'"></div> \
                                </div>';
                    catsId.push(cats[i].id);
                }
            }
        });
    }

    return (<div>
                <div className='col-sm-3 mx-4 p-4 filtros border-top position-absolute border-start'>
                    <h4>Categorias</h4>
                    <form method="get">
                        <div className="form-check filtrosForm" id="categorias"></div>
                        <button type="submit" name="submit" className="btn b2" onClick={handler} >Pesquisar</button>
                    </form>
                    <h4>Subcategorias</h4>
                    <form method="get">
                        <div className="form-check filtrosForm" id="subcategorias">
                            <p>Selecione uma categoria para que as suas subcategorias apareçam aqui!</p>
                        </div>
                        <button type="submit" name="submit2" className="btn b2" onClick={handler} >Pesquisar</button>
                    </form>
                </div>
            </div>);
}

export default Filtros;