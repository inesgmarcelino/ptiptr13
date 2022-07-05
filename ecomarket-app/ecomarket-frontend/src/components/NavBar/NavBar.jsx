import React from "react";
import { Col, Container, Form, Navbar, Row, NavLink } from "react-bootstrap";
import { default as LoginRow} from './LoginRow';

const logo = require('../../images/icons/logo.png');
const login = require('../../images/icons/login.png');
const signin = require('../../images/icons/signin.png');

function SideBar(){
    return(
        <Navbar>
            <Container fluid className="NavWrapper">
                <Row className="NavRow">
                    <Col xs={12} sm={12} md={4} lg={4} className="NavCol">
                        <Navbar.Brand href="/" >
                            <img src={logo} alt="" id="logo" />
                        </Navbar.Brand>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} className="NavCol NavSearch">
                        <Form.Control type="" placeholder="Search" className="SearchBar" />
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} className="NavCol NavLogin">
                        <Row className="logBox align-items-center">
                            <LoginRow/>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Navbar>
    );
}

export default SideBar;