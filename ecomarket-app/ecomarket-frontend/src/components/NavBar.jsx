import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { Col, Container, Form, Navbar, Row, NavLink, Stack, NavDropdown } from "react-bootstrap";

const logo = require('../images/icons/logo.png');
const login = require('../images/icons/login.png');
const signin = require('../images/icons/signin.png');
const cart = require('../images/icons/cart.png');

function SideBar(props) {
    const { isAuthenticated } = useAuth0();    

    return (
        <nav class="navbar fixed-top navbar-expand-lg p-md-3">
                <div class="container-fluid"> 
                    <a href="/" className="navbar-brand" ><img src={logo} alt="" id="logo" /></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <div class="mx-auto">
                        <input class="form-control me-2" id="searchBar" type="search" placeholder="Pesquise produtos aqui" size="50" aria-label="Search" />
                    </div>
                    <NavLink className="nav-link text-white" onClick={() => { window.location = "/catalog" }}>Catálogo</NavLink>
                    <ul class="navbar-nav">
                        <li className="nav-item"> {/* se autenticado user */}
                        {useLogin(isAuthenticated)}
                        </li>
                    </ul>
                    <NavLink onClick={() => { window.location = "/cart" }}>
                        <img src={cart} id="cart" alt=""/>
                    </NavLink>
                    </div>
                </div>
                </nav>
    );
}

function useLogin(logged) {
    const { loginWithRedirect,logout,user } = useAuth0();
    if(!logged){
        return (
            <Stack direction="horizontal" gap={1}>
                <NavLink className="nav-link text-white" onClick={() => { window.location = "/register" }} >
                    Registar
                </NavLink>
                <NavLink className="nav-link text-white" onClick={() => loginWithRedirect({})}>
                    Inicie Sessão
                </NavLink>
            </Stack>
        );
    } else {
        return (
            /*Trocar para username mais tarde e talvez acrescentar a fotografia se quiserem*/ 
            <NavDropdown title={`Olá, ${user.name}`} id="basic-nav-dropdown" className="NavDrop">
                <NavDropdown.Item href="/profile" style={{color: "black"}} >Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => logout({returnTo: window.location.origin,})}>Logout</NavDropdown.Item>
            </NavDropdown>
        );
    }

}



export default SideBar;