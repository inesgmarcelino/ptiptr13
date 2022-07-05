import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import {NavLink}  from "react-bootstrap";

function LoginButton() {
    const { loginWithRedirect } = useAuth0();
    return (
        <NavLink className="nav-link text-white" onClick={() => loginWithRedirect({})}>
            Inicie Sessão
        </NavLink>
    );
}

export default LoginButton;