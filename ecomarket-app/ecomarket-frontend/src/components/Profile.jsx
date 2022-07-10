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
  const [newtipo, setNewTipo]         = useState('');
  const [tipo, setTipo]               = useState('');
  const [newsubtipo, setNewSubtipo]   = useState('');
  const [papel, setPapel]             = useState('');

  var url = (process.env.REACT_APP_TEST === "true") ? process.env.REACT_APP_TEST_IP : process.env.REACT_APP_DOMAIN;

  if (!isLoading) {
  
    const handleShow = () => {
      $("#modal_admin").css("display","block");
    }
  
    const handleHide = () => {
      $("#modal_admin").css("display","none");
    }
  
    const whichUser = () => {
      Axios.get(url+"/api/v2/users", {
        params: {
          email: user.email
      }}).then((response) => {
        if (response.data.message !== 'fail') {
          setPapel(response.data.results[0].papel)
        }
      });

      if (papel === 1) { // se for admin
        return (
          <tbody>
            <tr>
              <td className='card-profile'><h3>Lista de Utilizadores</h3>
                <Link to ='/adminUsersList' id='profile'>
                  <button type="button" className="btn">Ver</button>
                </Link>
              </td>
            </tr>
            <tr>
              <td className='card-profile'><h3>Tipos</h3>
                <button type="button" id='profile' onClick={addTipo} className="btn">Adicionar</button>
              </td>
            </tr>
            <tr>
              <td className='card-profile'><h3>Subtipos</h3>
                <button type="button" id='profile' onClick={addSubtipo} className="btn">Adicionar</button>
              </td>
            </tr>
          </tbody>
        );
      } else if (papel === 2) { //Consumidor
          return (
            <tbody> 
              <tr>
                <td className='card-profile'><h3>Editar os meus dados</h3> <Link to ='/editProfile' id='profile' ><button type="button" className="btn"  >Editar</button></Link></td>
              </tr>
              <tr>
                <td className='card-profile'><h3>Consumidor</h3> <Link to ='/consumer' id='profile'> <button type="button" className="btn" >Ver</button></Link></td>
              </tr>
              <tr>
                <td className='card-profile'><h3>Fornecedor</h3> <Link to ='#' id='profile'> <button type="button" className="btn">Tornar-me</button></Link> </td>
              </tr>
            </tbody>);
      } else if (papel === 3) { // Fornecedor
        return (
          <tbody> 
            <tr>
              <td className='card-profile'><h3>Editar os meus dados</h3> <Link to ='/editProfile' id='profile' ><button type="button" className="btn"  >Editar</button></Link></td>
            </tr>
            <tr>
              <td className='card-profile'><h3>Fornecedor</h3> <Link to ='/provider' id='profile'> <button type="button" className="btn" >Ver</button></Link> </td>
            </tr>
            <tr>
              <td className='card-profile'><h3>Consumidor</h3> <Link to ='#' id='profile'> <button type="button" className="btn" >Tornar-me</button></Link></td>
            </tr>
          </tbody>);

      } else if (papel === 4) { //Consumidor && Fornecedor
        return (
          <tbody> 
            <tr>
              <td className='card-profile'><h3>Editar os meus dados</h3> <Link to ='/editProfile' id='profile' ><button type="button" className="btn"  >Editar</button></Link></td>
            </tr>
            <tr>
              <td className='card-profile'><h3>Consumidor</h3> <Link to ='/consumer' id='profile'> <button type="button" className="btn" >Ver</button></Link></td>
            </tr>
            <tr>
              <td className='card-profile'><h3>Fornecedor</h3> <Link to ='/provider' id='profile'> <button type="button" className="btn" >Ver</button></Link> </td>
            </tr>
            </tbody>);

      } else { //Transportador
        return (
          <tbody> 
            <tr>
              <td className='card-profile'><h3>Editar os meus dados</h3> <Link to ='/editProfile' id='profile' ><button type="button" className="btn"  >Editar</button></Link></td>
            </tr>
            <tr>
              <td className='card-profile'><h3>Transportador</h3> <Link to ='/transporter' id='profile'> <button type="button" className="btn" >Ver</button></Link> </td>
            </tr>
            </tbody>);

      }
    }
    
    const handler = (x) => {
      switch(x.target.name) {
        case "newtipo":
          setNewTipo(x.target.value);
          break;
        case "tipo":
          setTipo(x.target.value);
          break;
        case "newsubtipo":
          setNewSubtipo(x.target.value);
          break;
        case "submit":
          if (newtipo !== '' && tipo === '' && newsubtipo === '') {
            Axios.post(url+"/api/v1/admin/admintipo", {newtipo: newtipo}).then((response) => {
              console.log(response);
              if (response.data.message === "success") {
                document.getElementById("modal_header_admin").innerText = "Registo bem sucedido!";
                document.getElementById("modal_body_admin").innerHTML = "";
              }
            });
          } else if (tipo !== '' && newsubtipo !== '' && newtipo === '') {
              // Axios.post("https://ecomarket.works/api/v1/admin/admintipo", {newtipo: newtipo}).then((response) => {
              //   console.log(response);
              //   if (response.data.message === "success") {
                //     document.getElementById("modal_header_admin").innerText = "Registo bem sucedido!";
                //     document.getElementById("modal_body_admin").innerHTML = "";
                //   }
                // });
           }
          break;
        default:
          console.log();
      }
    }
            
    const addTipo = () => {
      document.getElementById("modal_header_admin").innerText = "Adicionar novo Tipo";
      document.getElementById("formulario").innerHTML = "<label>Tipo</label>\
      <input className='form-control' type='text' name='newtipo' onChange={handler} size='30'/>";
      handleShow();
    }
  
    const tipos = () => {
      var url = (process.env.REACT_APP_TEST === "true") ? process.env.REACT_APP_TEST_IP : process.env.REACT_APP_DOMAIN;
      document.getElementById("tipos").innerHTML = "<option value='' selected>Selecione um Tipo</option>";
      Axios.get(url+"/api/v1/gets/tipos").then((response) => {
          var tipo = response.data.results;
          for (var i = 0; i < tipo.length; i++) {
              document.getElementById("tipos").innerHTML += "<option value='" + tipo[i]["id"] + "'>" + tipo[i]["nome"] + "</option>";
          }
      });
    }
  
    const addSubtipo = () => {
      document.getElementById("modal_header_admin").innerText = "Adicionar novo Subipo";
      document.getElementById("modal_body_admin").innerHTML = "<label>Tipo</label>\
        <select className='form-select' name='tipo' id='tipos' onChange={handler} onMouseOver={tipos} required>\
            <option value='' selected>Selecione um Tipo</option>\
        </select>\
      </div>\
      <div className='col-md-12'>\
        <label>Subtipo</label>\
        <input className='form-control' type='text' name='newsubtipo' size='30'/>";
      handleShow();
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
  
        {/* MODAL */}
        <div className="modal fade" id="modal_admin" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                  <div className="modal-header" id="modal_header_admin">
                      <button type="button" className="btn-close" aria-label="Close"></button>
                  </div>
                  <div className="modal-body" id="modal_body_admin">
                      <div className='col-md-12' id="formulario"></div>
                      <button id='submit' type='submit' name='submit' onClick={handler} className='btn'>Adicionar</button>
                  </div>
                  <div className="modal-footer" id="modal_footer_admin">
                    <button type="button" onClick={handleHide} className="btn" id="cancelar2" >Cancelar</button>
                  </div>
              </div>
          </div>
        </div>
      </div>
    );
  } 

}

export default Profile;