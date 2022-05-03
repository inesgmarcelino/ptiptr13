import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {SideBar, Home, Login, Register, Cart, Footer, Profile } from './components';

ReactDOM.render(
  <Router>
    <SideBar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/profile' element={<Profile />} />
    </Routes>
    <Footer />
  </Router>,

  document.getElementById('root')
);