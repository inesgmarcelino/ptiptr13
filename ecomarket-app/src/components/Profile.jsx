import React from 'react'

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
  return (
    <div className="container">
      {/* <div className="container">
        <h3>A minha conta</h3>
      </div>
      <br /> */}
      <div className="container">
      <table className="table table-bordered">
        <thead>
        </thead>
        <tbody>
        <tr>
          <td style={{display: 'flex'}} ><h3>Editar os meus dados</h3> <button type="button" className="btn btn btn-primary" style={{display:'block', marginLeft:'auto', marginRight:'20px', width:'150px'}} >Editar</button></td>
          </tr>
          <tr>
          <td style={{display: 'flex'}} ><h3>Sou Consumidor</h3> <button type="button" className="btn btn btn-primary" style={{display:'block', marginLeft:'auto', marginRight:'20px', width:'150px'}} >Ver</button></td>
          </tr>
          <tr>
          <td style={{display: 'flex'}} ><h3>Sou Fornecedor</h3> <button type="button" className="btn btn btn-primary" style={{display:'block', marginLeft:'auto', marginRight:'20px', width:'150px'}} >Ver</button></td>
          </tr>
          <tr>
          <td style={{display: 'flex'}} ><h3>Sou Transportador</h3> <button type="button" className="btn btn btn-primary" style={{display:'block', marginLeft:'auto', marginRight:'20px', width:'150px'}} >Tornar-me</button></td>
          </tr>
        </tbody>
        </table>
      </div>
    </div>
  )
}

export default Profile;