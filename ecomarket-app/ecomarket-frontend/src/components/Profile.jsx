/* eslint-disable no-multi-str */
import $ from 'jquery';
import React from 'react'
import Axios from "axios";
import { Link } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';

function Profile() {
  const { user, isLoading } = useAuth0();

  // var newtipo, tipo, newsubtipo;
  const [newCat, setNewCat]         = useState();
  const [cat, setCat]               = useState();
  const [newSubcat, setNewSubcat]   = useState();
  const [papel, setPapel]           = useState();
  const [id, setID]                 = useState();

  var url = (process.env.REACT_APP_TEST === "true") ? process.env.REACT_APP_TEST_IP : process.env.REACT_APP_DOMAIN;

  if (!isLoading) {
  
    const handleShowCat = () => {
      $("#modal_cat").css("display","block");
    }
  
    const handleHideCat = () => {
      $("#modal_cat").css("display","none");
    }

    const handleShowSubcat = () => {
      $("#modal_subcat").css("display","block");
      categorias();
    }

    const handleHideSubcat = () => {
      $("#modal_subcat").css("display","none");
    }
  
    const whichUser = () => {
      Axios.get(url+"/api/v2/users", {
        params: {
          email: user.email
      }}).then((response) => {
        if (response.data.message !== 'fail') {
          setPapel(response.data.results[0].papel);
          setID(response.data.results[0].id);
        }
      });

      if (papel === 1) { // se for admin
        return (
          <tbody>
            <tr>
              <td className='card-profile'><h3>Lista de Utilizadores</h3>
                <Link to ='/adminUsersList' id='profile'>
                  <button type="button" className="btn btn2">Ver</button>
                </Link>
              </td>
            </tr>
            <tr>
              <td className='card-profile'><h3>Tipos</h3>
                <button type="button" id='profile' onClick={handleShowCat} className="btn btn2">Adicionar</button>
              </td>
            </tr>
            <tr>
              <td className='card-profile'><h3>Subtipos</h3>
                <button type="button" id='profile' onClick={handleShowSubcat} className="btn btn2">Adicionar</button>
              </td>
            </tr>
          </tbody>
        );
      } else if (papel === 2) { //Consumidor
          return (
            <tbody> 
              <tr>
                <td className='card-profile'><h3>Editar os meus dados</h3> <Link to={`/editProfile/${id}`} id='profile' ><button type="button" className="btn btn2"  >Editar</button></Link></td>
              </tr>
              <tr>
                <td className='card-profile'><h3>Consumidor</h3> <Link to ='/consumer' id='profile'> <button type="button" className="btn btn2" >Ver</button></Link></td>
              </tr>
              <tr>
                <td className='card-profile'><h3>Fornecedor</h3> <Link to ='#' id='profile'> <button type="button" className="btn btn2">Tornar-me</button></Link> </td>
              </tr>
            </tbody>);
      } else if (papel === 3) { // Fornecedor
        return (
          <tbody> 
            <tr>
              <td className='card-profile'><h3>Editar os meus dados</h3> <Link to={`/editProfile/${id}`} id='profile' ><button type="button" className="btn btn2"  >Editar</button></Link></td>
            </tr>
            <tr>
              <td className='card-profile'><h3>Fornecedor</h3> <Link to ='/provider' id='profile'> <button type="button" className="btn btn2" >Ver</button></Link> </td>
            </tr>
            <tr>
              <td className='card-profile'><h3>Consumidor</h3> <Link to ='#' id='profile'> <button type="button" className="btn btn2" >Tornar-me</button></Link></td>
            </tr>
          </tbody>);

      } else if (papel === 4) { //Consumidor && Fornecedor
        return (
          <tbody> 
            <tr>
              <td className='card-profile'><h3>Editar os meus dados</h3> <Link to={`/editProfile/${id}`} id='profile' ><button type="button" className="btn btn2"  >Editar</button></Link></td>
            </tr>
            <tr>
              <td className='card-profile'><h3>Consumidor</h3> <Link to ='/consumer' id='profile'> <button type="button" className="btn btn2" >Ver</button></Link></td>
            </tr>
            <tr>
              <td className='card-profile'><h3>Fornecedor</h3> <Link to ='/provider' id='profile'> <button type="button" className="btn btn2" >Ver</button></Link> </td>
            </tr>
            </tbody>);

      } else { //Transportador
        return (
          <tbody> 
            <tr>
              <td className='card-profile'><h3>Editar os meus dados</h3> <Link to={`/editProfile/${id}`} id='profile' ><button type="button" className="btn btn2"  >Editar</button></Link></td>
            </tr>
            <tr>
              <td className='card-profile'><h3>Transportador</h3> <Link to ='/transporter' id='profile'> <button type="button" className="btn btn2" >Ver</button></Link> </td>
            </tr>
            </tbody>);

      }
    }
    
    const handler = (x) => {
      switch(x.target.name) {
        case "newcategoria":
          setNewCat(x.target.value);
          break;
        case "categoria":
          setCat(x.target.value);
          break;
        case "newsubcategoria":
          setNewSubcat(x.target.value);
          break;
        case "submitCat":
          Axios.post(url+"/api/v2/admin/addCat", {
            cat: newCat
          }).then((response) => {
            if (response.data.message === 'success') {
              handleHideCat();
            }
          })
          break;
        case "submitSubcat":
          console.log(cat, newSubcat);
          Axios.post(url+"/api/v2/admin/addSubcat", {
            cat: cat,
            subcat: newSubcat
          }).then((response) => {
            if (response.data.message === 'success') {
              handleHideSubcat();
            }
          })
          break;
        default:
          console.log();
      }
    }
  
    const categorias = () => {
      var url = (process.env.REACT_APP_TEST === "true") ? process.env.REACT_APP_TEST_IP : process.env.REACT_APP_DOMAIN;
      document.getElementById("categorias").innerHTML = "<option value='' selected>Selecione uma Categoria</option>";
      Axios.get(url+"/api/v1/gets/categorias").then((response) => {
          var tipo = response.data.results;
          for (var i = 0; i < tipo.length; i++) {
              document.getElementById("categorias").innerHTML += "<option value='" + tipo[i]["id"] + "'>" + tipo[i]["nome"] + "</option>";
          }
      });
    }
            
    return (
      <div className="position-absolute showItems">
        <div className="container">
          <br />
          <h3>A minha conta</h3>
        </div>
        <br />
        <br />
        <div className="container">
          <table className="table table-bordered">
            <thead>
            </thead>
            {whichUser()}
          </table>
        </div>
  
        {/* MODAL CATEGORIA */}
        <div className="modal fade" id="modal_cat" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                  <div className="modal-header" id="modal_header_cat">
                      Registe uma Categoria
                  </div>
                  <div className="modal-body" id="modal_body_cat">
                    <label>Nome</label>
                    <input className='form-control' type='text' onChange={handler} name='newcategoria' />
                  </div> 
                  <div className="modal-footer" id="modal_footer_cat">
                      <button type="button" onClick={handleHideCat} className="btn" id="cancelar" >Cancelar</button>
                      <button id='submit' type='submit' name='submitCat' onClick={handler} className='btn btn2' >Adicionar</button>
                  </div>
              </div>
          </div>
        </div>
        {/* MODAL SUBCATEGORIA */}
        <div className="modal fade" id="modal_subcat" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                  <div className="modal-header" id="modal_header_subcat">
                    Registe uma Subcategoria
                  </div>
                  <div className="modal-body" id="modal_body_subcat">
                    <label>Selecione a Categoria</label>
                      <select className='form-select' name='tipo' id='categorias' name='categoria' onChange={handler} required>
                      </select>
                    <label>Nome da Subcategoria</label>
                      <input className='form-control' type='text' onChange={handler} name='newsubcategoria'/>
                  </div> 
                  <div className="modal-footer" id="modal_footer_subcat">
                      <button type="button" onClick={handleHideSubcat} className="btn" id="cancelar" >Cancelar</button>
                      <button id='submit' type='submit' name='submitSubcat' onClick={handler} className='btn btn2' >Adicionar</button>
                  </div>
              </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (<div></div>);
  }

}

export default Profile;