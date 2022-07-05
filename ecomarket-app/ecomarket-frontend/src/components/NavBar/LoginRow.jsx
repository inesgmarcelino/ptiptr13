import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { Row, Col, NavLink } from "react-bootstrap";

import { default as LoginButton } from './LoginButton';
import { default as LogoutButton } from './LogoutButton';

const cart = require('../../images/icons/cart.png');

function LoginRow() {
    const { user, isAuthenticated } = useAuth0();
    if (!isAuthenticated) {
        return (
            <Row>
                <Col xs={6} sm={6} md={2} lg={2} className="NavCol">
                    <NavLink className="nav-link text-white" onClick={() => { window.location = "/register" }} >
                        Registar
                    </NavLink>
                </Col>
                <Col xs={6} sm={6} md={2} lg={2} className="NavCol">
                    <LoginButton />
                </Col>
            </Row>
        );
    } else {
        return (
            <Row>
                <Col xs={4} sm={4} md={2} lg={2} className="NavCol">
                    <NavLink to="/Cart">
                        <img src={cart} id="cart" alt="" className="d-inline-block align-center" />
                    </NavLink>
                </Col>
                <Col xs={4} sm={4} md={2} lg={2} className="NavCol">
                    <NavLink className="nav-link text-white" href="/profile">
                        Profile
                    </NavLink>
                </Col>
                <Col xs={4} sm={4} md={2} lg={2} className="NavCol">
                    <LogoutButton />
                </Col>
            </Row>
        )
    }
}

export default LoginRow;