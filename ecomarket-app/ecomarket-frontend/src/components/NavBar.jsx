import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { Col, Container, Form, Navbar, Row, NavLink, Stack, NavDropdown } from "react-bootstrap";

const logo = require('../images/icons/logo.png');
const login = require('../images/icons/login.png');
const signin = require('../images/icons/signin.png');
const cart = require('../images/icons/cart.png');


function SideBar() {
    const { isAuthenticated } = useAuth0();    
    return (
        <Navbar>
            <Stack direction="horizontal" gap={1}>
                <Navbar.Brand href="/" xs={12} xxl={4}>
                    <img src={logo} alt="" id="logo" />
                </Navbar.Brand>
                <Form>
                    <Form.Group>
                        <Form.Control type="" placeholder="Search" className="searchBar" />
                    </Form.Group>
                </Form>
                <Row className="logBox">
                    <Col>
                        <NavLink to="/Cart">
                            <img src={cart} id="cart" alt="" className="d-inline-block align-center" />
                        </NavLink>
                    </Col>
                    <Col >
                        {useLogin(isAuthenticated)}
                    </Col>
                </Row>
            </Stack>
        </Navbar>
    );
}

function useLogin(logged) {
    const { loginWithRedirect,logout,user } = useAuth0();
    if(!logged){
        return (
            <Row>
                <Col>
                    <NavLink className="nav-link text-white" onClick={() => loginWithRedirect({}) }>
                        Inicie Sessão
                    </NavLink>
                </Col>
                <Col>
                    <NavLink className="nav-link text-white" to="/register">
                        Registar
                    </NavLink>
                </Col>
            </Row>
        );
    } else {
        return (
            /*Trocar para username mais tarde e talvez acrescentar a fotografia se quiserem*/ 
            <NavDropdown title={user.email} id="basic-nav-dropdown" className="NavDrop">
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => logout({returnTo: window.location.origin,})}>Logout</NavDropdown.Item>
            </NavDropdown>
        );
    }

}



export default SideBar;