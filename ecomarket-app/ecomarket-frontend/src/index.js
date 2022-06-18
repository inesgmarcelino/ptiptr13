import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import Auth0ProviderWithHistory from './auth/auth0-hist-prov';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {NavBar, Home, Login, Register, Cart, Footer, Profile, MyData, Catalog, Payment, ShoopingCart, Consumidor, 
   Fornecedor, ConfirmarEncomenda, Comparador, Product, Product2, ArmazemRegister, ProductRegister, Album, AdminLogin, AdminTipos} from './components';
import App from "./app";

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
              <Route path='/product2' element={<Product2 />} />
              <Route path='/ArmazemRegister' element={<ArmazemRegister />} />
              <Route path='/ProductRegister' element={<ProductRegister />} />
              <Route path='/Album' element={<Album />} />
              <Route path='/admintipos' element={<AdminTipos />} />
          </Routes>
    </Auth0ProviderWithHistory>
  {/* <Footer /> */}
</Router>
);
