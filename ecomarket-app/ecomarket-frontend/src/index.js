import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import Auth0ProviderWithHistory from './auth/auth0-hist-prov';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {NavBar, Home, Login, Register, Cart, Footer, Profile, EditProfile, Catalog, Payment, Consumer, Provider,
    ConfirmarEncomenda, Comparador, Product, StorageRegister, ProductRegister, AdminLogin, AdminTipos} from './components';


const root = createRoot(
    document.getElementById("root")
);

root.render(
  <Router>
    <Auth0ProviderWithHistory>
    <NavBar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/editProfile' element={<EditProfile />} />
      <Route path='/payment' element={<Payment />} />
      <Route path='/consumer' element={<Consumer />} />
      <Route path='/providder' element={<Provider />} />
      <Route path='/confirmarEncomenda' element={<ConfirmarEncomenda />} />
      <Route path='/comparador' element={<Comparador />} />
      <Route path='/adminLogin' element={<AdminLogin />} />
      <Route path='/product' element={<Product />} />
      <Route path='/storageRegister' element={<StorageRegister />} />
      <Route path='/productRegister' element={<ProductRegister />} />
      <Route path='/catalog' element={<Catalog />} />
      <Route path='/admintipos' element={<AdminTipos />} />


    </Routes>
    {/* <Footer /> */}
    </Auth0ProviderWithHistory>
  </Router>,

  document.getElementById('root')
);
