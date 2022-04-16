import React from "react";
import {NavLink} from 'react-router-dom';
const logo = require('../images/icons/logo.png');
const login = require('../images/icons/login.png');
const signin = require('../images/icons/signin.png');
const cart = require('../images/icons/cart.png');

function SideBar() {
    return (
            <div className="sidebar col-2 mb-4">
                <a href="/" ><img src={logo} alt="" id="logo" /></a>               
                <input className="form-control" type="search" placeholder="Pesquisar" aria-label="Search" />
                <ul className="nav bottom">
                    <li className="nav-item"> {/* se autenticado user */}
                        <NavLink className="nav-link" to="/login">
                        <img src={login} alt="" id="icon" />
                        Inicie Sessão
                        {/* falta os pontos */}
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/register">
                        <img src={signin} alt="" id="icon" />
                        Registe-se
                        </NavLink>
                    </li>
                    <hr className="dropdown-divider"/>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/cart">
                        <img src={cart} alt="" id="cart" />
                        Carrinho
                        </NavLink>
                    </li>
                </ul>
            </div>
    );
}

export default SideBar;