import React from "react";
import {NavLink} from 'react-router-dom';
const logo = require('../images/icons/logo.png');
const login = require('../images/icons/login.png');
const signin = require('../images/icons/signin.png');
const cart = require('../images/icons/cart.png');

function SideBar() {
    return (
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