import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {NavBar, Home, Login, Register, Cart, Footer, Profile, MyData, Payment, ShoopingCart, Consumidor, Fornecedor} from './components';


ReactDOM.render(
  <Router>
    <NavBar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/mydata' element={<MyData />} />
      <Route path='/payment' element={<Payment />} />
      <Route path='/shoopingcart' element={<ShoopingCart />} />
      <Route path='/consumidor' element={<Consumidor />} />
      <Route path='/fornecedor' element={<Fornecedor />} />
    </Routes>
    <Footer />
  </Router>,

  document.getElementById('root')
);