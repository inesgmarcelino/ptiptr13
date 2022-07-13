import $ from "jquery";
import Axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
const img3 = require('../images/plus.png')
const img4 = require('../images/less.png')

function Product(){
    let { id }  = useParams();
    const { user, isLoading }   = useAuth0();

    const [cid, setCID]         = useState('');
    const [papel, setPapel]     = useState('');

    const [nome, setNome]   = useState('');
    const [preco, setPreco] = useState('');
    const [forn, setForn]   = useState('');
    const [data, setData]   = useState('');
    const [cat, setCat]     = useState('');
    const [scat, setScat]   = useState('');
    var url = (process.env.REACT_APP_TEST === "true") ? process.env.REACT_APP_TEST_IP : process.env.REACT_APP_DOMAIN;

    if (isLoading) {
        return (<div></div>);
    } else {
        const getsUser = () => {
            Axios.get(url+"/api/v2/users", {
                params: {
                  email: user.email
              }}).then((response) => {
                if (response.data.message !== 'fail') {
                  setPapel(response.data.results[0].papel)
                  setCID(response.data.results[0].id);
                }
              });
        }

        getsUser();

        const minus = () => {
            var count = $("#qtty").val();
            if (count > 0) {
                count--;
                $("#qtty").val(count);
            }
        }

        const plus = () => {
            var count = $("#qtty").val();
            count++;
            $("#qtty").val(count);
        }

        const handler = () => {
            Axios.post(url+"/api/v1/consumers/add_prod_shbag", {
                cons: cid,
                prod: id,
                qtty: $("#qtty").val()
            }).then((response) => {
                if (response.data.message === 'success') {
                    window.location = "/cart";
                }
            })
        }

        const get = () => {
            Axios.get(url+"/api/v1/products/id", {
                params: {
                    id: id
            }}).then((response) => {
                if (response.data.message !== 'fail') {
                    setNome(response.data.results[0].nome);
                    setPreco(response.data.results[0].preco);
                    setForn(response.data.results[0].forn);
                    setData(response.data.results[0].data.substring(0,10));
                    setCat(response.data.results[0].cat);
                    setScat(response.data.results[0].subcat);
                }
            });
        }

        const consumidor = () => {
            if (papel === 2 || papel === 4) {
            return (<div>
                        <div className="col-sm quantity">
                            <button className="minus-btn1" type="button" onClick={minus} name="button">
                                <img src={img4} alt="" />
                            </button>
                            <input type="text" id="qtty" name="qtty" value={1}/>
                            <button className="plus-btn1" type="button" onClick={plus} name="button">
                                <img src={img3} alt=""/>
                            </button>
                        </div>
                        <button className="btn btn2" onClick={handler}>Adicionar Carrinho</button>
                    </div>);
            }
        }

        get();

        return(
            <div className="position-absolute showItems">
            <div className='container'>
            <section className='product-details'>
                <div className="details">
                    <h2 className="product-brand">{nome}</h2>
                    <span className="product-price">{preco}€/un.</span>
                    <h3 className="product-short-des">Fornecedor:</h3>
                    <p>{forn}</p>
                    <h3 className="product-short-des">Data de Produção:</h3>
                    <p>{data}</p>
                    <h3 className="product-short-des">Categoria:</h3>
                    <p>{cat}</p>
                    <h3 className="product-short-des">Subcategoria:</h3>
                    <p>{scat}</p>
                    {consumidor()}
                </div>
            </section>
            </div>
            </div>);
    }
}

export default Product;