import React from 'react'
import {Link } from "react-router-dom";

function Profile() {

  /* const style1 = {
    'display': 'flex',
  }

  const style2 = {
    'display='block', 
    marginLeft='auto', 
    marginRight='20px', 
    width='150px'
  }
 */

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
        </table>
      </div>
    </div>
  )
}

export default Profile;