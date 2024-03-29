import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import Auth0ProviderWithHistory from './auth/auth0-hist-prov';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {NavBar, Home, Login, Register, Cart, Footer, Profile, EditProfile, Catalog, Payment, Consumer, Provider,
    ConfirmarEncomenda, Comparador, Product, StorageRegister, ProductRegister, ProductRegister2, AdminLogin, AdminTipos, Order, Transporter, AdminUsersList, CarRegister, ProductExists, NewProduct, SelectTransp, SelectCar} from './components';


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
      <Route path='/editProfile/:id' element={<EditProfile />} />
      <Route path='/payment' element={<Payment />} />
      <Route path='/consumer' element={<Consumer />} />
      <Route path='/provider' element={<Provider />} />
      <Route path='/confirmarEncomenda' element={<ConfirmarEncomenda />} />
      <Route path='/comparador' element={<Comparador />} />
      <Route path='/adminLogin' element={<AdminLogin />} />
      <Route path='/product/:id' element={<Product />} />
      <Route path='/selectTransp/:id' element={<SelectTransp />} />
      <Route path='/selectCar/:id' element={<SelectCar />} />
      <Route path='/storageRegister' element={<StorageRegister />} />
      <Route path='/productRegister' element={<ProductRegister />} />
      <Route path='/productExists' element={<ProductExists />} />
      <Route path='/newProduct' element={<NewProduct />} />
      <Route path='/catalog' element={<Catalog />} />
      <Route path='/admintipos' element={<AdminTipos />} />
      <Route path='/order/:id' element={<Order />} />
      <Route path='/transporter' element={<Transporter />} />
      <Route path='/adminUsersList' element={<AdminUsersList />} />
      <Route path='/carRegister' element={<CarRegister />} />


    </Routes>
    {/* <Footer /> */}
    </Auth0ProviderWithHistory>
  </Router>,

  document.getElementById('root')
);
