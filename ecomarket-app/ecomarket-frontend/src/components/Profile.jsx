/* eslint-disable no-multi-str */
import $ from 'jquery';
import React from 'react'
import Axios from "axios";
import {Link } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

function Profile() {
  const { user } = useAuth0();
  const email = "admin@ecomarket.pt"; //testar admin

  /* const goMyData = () => {
    window.location.href = "http://localhost:3000/myData";
  }

  const goConsumidor = () => {
    window.location.href = "http://localhost:3000/consumidor";
  }

  const goFornecedor = () => {
    window.location.href = "http://localhost:3000/fornecedor";
  }

  const goTransportador = () => {
    window.location.href = "http://localhost:3000/trasnportador";
  } */

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
                  <button id='submit' type='submit' name='submit' onSubmit={handler} className='btn'>Adicionar</button>
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

function isAdmin(email) {
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

function addTipo() {
  document.getElementById("modal_header_admin").innerText = "Adicionar novo Tipo";
  document.getElementById("formulario").innerHTML = "<label>Tipo</label>\
  <input className='form-control' type='text' id='newtipo' name='tipo' size='30'/>\
  </div>";
  handleShow();
}

function addSubtipo() {
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

function handleShow() {
  $("#modal_admin").css("display","block");
}

function handleHide() {
  $("#modal_admin").css("display","none");
}

function handler(x) {
  switch(x.targer.value) {
    case "submit1":
      var dist = document.getElementById("newtipo").value;
      if (dist === '') {
        console.log("aqui");
        // setError(true);
      } else {
        console.log(dist);
        Axios.post("https://ecomarket.works/api/v1/admin/admintipo", {dist: dist}).then((response) => {
          console.log(response);
          if (response.data.message === "success") {
            document.getElementById("modal_header_admin").innerText = "Registo bem sucedido!";
            document.getElementById("modal_body_admin").innerHTML = "";
          }
        });
      }
      break;
    case "submit2":
      break;
    default:
      console.log();
  }
}

export default Profile;