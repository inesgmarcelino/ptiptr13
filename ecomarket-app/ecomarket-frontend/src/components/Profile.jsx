/* eslint-disable no-multi-str */
import $ from 'jquery';
import React from 'react'
import Axios from "axios";
import { Link } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';

function Profile() {
  const { user } = useAuth0();
  const email = "admin@ecomarket.pt"; //testar admin

  // var newtipo, tipo, newsubtipo;
  const [newtipo, setNewTipo]         = useState('');
  const [tipo, setTipo]               = useState('');
  const [newsubtipo, setNewSubtipo]   = useState('');

  const handleShow = () => {
    $("#modal_admin").css("display","block");
  }

  const handleHide = () => {
    $("#modal_admin").css("display","none");
  }

  const isAdmin = () => {
    if (email === "admin@ecomarket.pt") { // se for admin
      return (
        <tbody>
          <tr>
            <td className='card-profile'><h3>Lista de Utilizadores</h3>
              <Link to ='/' id='profile'>
                <button type="button" className="btn btn btn-primary">Ver</button>
              </Link>
            </td>
          </tr>
          <tr>
            <td className='card-profile'><h3>Tipos</h3>
              <button type="button" id='profile' onClick={addTipo} className="btn btn btn-primary">Adicionar</button>
            </td>
          </tr>
          <tr>
            <td className='card-profile'><h3>Subtipos</h3>
              <button type="button" id='profile' onClick={addSubtipo} className="btn btn btn-primary">Adicionar</button>
            </td>
          </tr>
        </tbody>
      );
    } else {
      return (
        <tbody> 
          <tr>
            <td className='card-profile'><h3>Editar os meus dados</h3> <Link to ='/mydata' id='profile' ><button type="button" className="btn btn btn-primary"  >Editar</button></Link></td>
          </tr>
          <tr>
            <td className='card-profile'><h3>Sou Consumidor</h3> <Link to ='/consumidor' id='profile'> <button type="button" className="btn btn btn-primary" >Ver</button></Link></td>
          </tr>
          <tr>
            <td className='card-profile'  ><h3>Sou Fornecedor</h3> <Link to ='/fornecedor' id='profile'> <button type="button" className="btn btn btn-primary" >Ver</button></Link> </td>
          </tr>
          <tr>
            <td className='card-profile'><h3>Sou Transportador</h3> <Link to ='/login' id='profile'> <button type="button" className="btn btn btn-primary" >Tornar-me</button></Link> </td>
          </tr>
          </tbody>
      );
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
          Axios.post("https://ecomarket.works/api/v1/admin/admintipo", {newtipo: newtipo}).then((response) => {
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

  const addSubtipo = () => {
    document.getElementById("modal_header_admin").innerText = "Adicionar novo Subipo";
    document.getElementById("modal_body_admin").innerHTML = "<label>Distrito</label>\
      <select className='form-select' name='distrito' id='distritos' onChange={handler} onMouseOver={distritos} required>\
          <option value='' selected>Selecione um Distrito</option>\
      </select>\
    </div>\
    <div className='col-md-12'>\
      <label>Tipo</label>\
      <input className='form-control' type='text' name='tipo' size='30'/>";
    handleShow();
  }
          
  return (
    <div className="position-absolute showItems">  {/* Aqui antes estava container inves de profile */}
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
          {isAdmin(email)}
        </table>
      </div>

      {/* MODAL */}
      <div className="modal fade" id="modal_admin" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header" id="modal_header_admin">~
                    <button type="button" className="btn-close" aria-label="Close"></button>
                </div>
                <div className="modal-body" id="modal_body_admin">
                    <div className='col-md-12' id="formulario"></div>
                    <button id='submit' type='submit' name='submit' onClick={handler} className='btn'>Adicionar</button>
                </div>
                <div className="modal-footer" id="modal_footer_admin">
                  <button type="button" onClick={handleHide} className="btn" id="cancelar">Cancelar</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;