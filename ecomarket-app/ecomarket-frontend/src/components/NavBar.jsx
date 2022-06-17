import React from "react";
import {NavLink} from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';


const logo = require('../images/icons/logo.png');
const login = require('../images/icons/login.png');
const signin = require('../images/icons/signin.png');
const cart = require('../images/icons/cart.png');


function SideBar() {
    const { loginWithRedirect } = useAuth0();
    return (
            <nav class="navbar fixed-top navbar-expand-lg p-md-3">
                <div class="container-fluid"> 
                    <a href="/" className="navbar-brand" ><img src={logo} alt="" id="logo" /></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <div class="mx-auto"></div>
                    <input class="form-control me-2" id="searchBar" type="search" placeholder="Search" aria-label="Search" />
                    <NavLink to="/Cart">
                        <img src={cart} id="cart" alt=""/>
                    </NavLink>
                    <ul class="navbar-nav">
                        <li className="nav-item"> {/* se autenticado user */}
                         <NavLink className="nav-link text-white" onClick={() => loginWithRedirect()}>
                            Inicie Sessão
                             {/* falta os pontos */}
                             </NavLink>
                         </li>
                         <li className="nav-item">
                         <NavLink className="nav-link text-white" onClick={() => loginWithRedirect({screen_hint:'signup'})}>
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