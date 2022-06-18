import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './temp/catalogStyles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {NavBar, Home, Login, Register, Cart, Footer, Profile, EditProfile, Catalog, Payment, ShoppingCart, Consumidor, 
   Fornecedor, ConfirmarEncomenda, Comparador, Product, ArmazemRegister, ProductRegister, Album, AdminLogin, AdminTipos} from './components';



ReactDOM.render(
  <Router>
    <NavBar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/catalog' element={<Catalog/>} />  
      <Route path='/profile' element={<Profile />} />
      <Route path='/editProfile' element={<EditProfile />} />
      <Route path='/payment' element={<Payment />} />
      <Route path='/shoppingCart' element={<ShoppingCart />} />
      <Route path='/consumidor' element={<Consumidor />} />
      <Route path='/fornecedor' element={<Fornecedor />} />
      <Route path='/confirmarEncomenda' element={<ConfirmarEncomenda />} />
      <Route path='/comparador' element={<Comparador />} />
      <Route path='/adminLogin' element={<AdminLogin />} />
      <Route path='/product' element={<Product />} />
      <Route path='/ArmazemRegister' element={<ArmazemRegister />} />
      <Route path='/ProductRegister' element={<ProductRegister />} />
      <Route path='/Album' element={<Album />} />
      <Route path='/admintipos' element={<AdminTipos />} />


    </Routes>
    {/* <Footer /> */}
  </Router>,

  document.getElementById('root')
);