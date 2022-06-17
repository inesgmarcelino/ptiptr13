import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { Col, Container, Form, Navbar, Row, NavLink, Stack } from "react-bootstrap";

const logo = require('../images/icons/logo.png');
const login = require('../images/icons/login.png');
const signin = require('../images/icons/signin.png');
const cart = require('../images/icons/cart.png');


function SideBar() {
    const { isAuth } = useAuth0();    
    return (
        <Navbar className="nav navbar fixed-top navbar-expand-lg p-md-3">
            <Container type="div" fluid>
                <Navbar.Brand href="/" className="nav navbar-brand">
                    <img src={logo} alt="" id="logo" />
                </Navbar.Brand>
            </Container>

            <Container >
                
                <Form>
                    <Form.Group>
                        <Form.Control type="" placeholder="Search" className="me-auto"/>
                    </Form.Group>
                </Form>
            </Container>
                <NavLink to="/Cart">
                    <img src={cart} id="cart" alt=""/>
                </NavLink>
                <Container>
                    {useLogin(isAuth)}
                </Container>
            
            <Container>
            </Container>
        </Navbar>    
    );
}

function useLogin(logged) {
    const { loginWithRedirect } = useAuth0();
    const { logout } = useAuth0();
    if(!logged){
        return (
            <Row>
                <Col>
                    <NavLink className="nav-link text-white" onClick={() => loginWithRedirect({}) }>
                        Inicie Sessão
                    </NavLink>
                </Col>
                <Col>
                    <NavLink className="nav-link text-white" onClick={() => loginWithRedirect({screen_hint: 'signup',}) }>
                        Registar
                    </NavLink>
                </Col>
            </Row>
        );
    } else {
        return (
            <Row>
                <Col>
                    <NavLink className="nav-link text-white">
                        {() => function getUserName(){
                            return "Utilizador1";
                        }}
                    </NavLink>
                </Col>
                <Col>
                    <NavLink className="nav-link text-white" onClick={() => logout({returnTo: window.location.origin,})}>
                        Logout
                    </NavLink>
                </Col>
            </Row>
        );
    }

}

export default SideBar;