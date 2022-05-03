import React from "react";
import {NavLink} from 'react-router-dom';
const logo = require('../images/icons/logo.png');
const login = require('../images/icons/login.png');
const signin = require('../images/icons/signin.png');
const cart = require('../images/icons/cart.png');

function SideBar() {
    return (
            // <div className="sidebar col-2 mb-4">
            //     <a href="/" ><img src={logo} alt="" id="logo" /></a>               
            //     <input className="form-control" type="search" placeholder="Pesquisar" aria-label="Search" id="searchBar" />
            //     <ul className="nav bottom">
            //         <li className="nav-item"> {/* se autenticado user */}
            //             <NavLink className="nav-link" to="/login">
            //             <img src={login} alt="" id="icon" />
            //             Inicie Sessão
            //             {/* falta os pontos */}
            //             </NavLink>
            //         </li>
            //         <li className="nav-item">
            //             <NavLink className="nav-link" to="/register">
            //             <img src={signin} alt="" id="icon" />
            //             Registe-se
            //             </NavLink>
            //         </li>
            //         <hr className="dropdown-divider"/>
            //         <li className="nav-item">
            //             <NavLink className="nav-link" to="/cart">
            //             <img src={cart} alt="" id="cart" />
            //             Carrinho
            //             </NavLink>
            //         </li>
            //     </ul>
            // </div>
            <nav class="navbar fixed-top navbar-expand-lg p-md-3">
                <div class="container-fluid"> 
                    <a href="/" className="navbar-brand" ><img src={logo} alt="" id="logo" /></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <div class="mx-auto"></div>
                    <form class="d-flex">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        {/* <button class="btn btn-outline-success" type="submit">Search</button> */}
                    </form>
                    <ul class="navbar-nav">
                        <li className="nav-item"> {/* se autenticado user */}
                         <NavLink className="nav-link text-white" to="/login">
                            Inicie Sessão
                             {/* falta os pontos */}
                             </NavLink>
                         </li>
                         <li className="nav-item">
                         <NavLink className="nav-link text-white" to="/register">
                            Registe-se
                         </NavLink>
                        </li>
                    </ul>
                    </div>
                </div>
                </nav>
    );
}

export default SideBar;