import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './temp/catalogStyles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {NavBar, Home, Login, Register, Cart, Footer, Profile, MyData, Catalog, Payment, ShoopingCart, Consumidor, Fornecedor, ConfirmarEncomenda, Comparador} from './components';



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
      <Route path='/mydata' element={<MyData />} />
      <Route path='/payment' element={<Payment />} />
      <Route path='/shoopingcart' element={<ShoopingCart />} />
      <Route path='/consumidor' element={<Consumidor />} />
      <Route path='/fornecedor' element={<Fornecedor />} />
      <Route path='/confirmarencomenda' element={<ConfirmarEncomenda />} />
      <Route path='/comparador' element={<Comparador />} />
    </Routes>
    {/* <Footer /> */}
  </Router>,

  document.getElementById('root')
);