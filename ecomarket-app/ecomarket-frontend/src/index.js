import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './temp/catalogStyles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
<<<<<<< HEAD
import {NavBar, Home, Login, Register, Cart, Footer, Profile, MyData, Catalog, Payment, ShoopingCart, Consumidor, Fornecedor, ConfirmarEncomenda, Comparador, Product, AdminLogin, Admin} from './components';
=======
import {NavBar, Home, Login, Register, Cart, Footer, Profile, MyData, Catalog, Payment, ShoopingCart, Consumidor, Fornecedor, ConfirmarEncomenda, Comparador, Product, Product2, ArmazemRegister, ProductRegister, Album} from './components';
>>>>>>> sofia



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
      <Route path='/product' element={<Product />} />
      <Route path='/adminlogin' element={<AdminLogin />} />
      <Route path='/admin' element={<Admin />} />
      <Route path='/product2' element={<Product2 />} />
      <Route path='/ArmazemRegister' element={<ArmazemRegister />} />
      <Route path='/ProductRegister' element={<ProductRegister />} />
      <Route path='/Album' element={<Album />} />

    </Routes>
    {/* <Footer /> */}
  </Router>,

  document.getElementById('root')
);