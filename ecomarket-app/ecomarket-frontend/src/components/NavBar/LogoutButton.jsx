import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import {NavLink}  from "react-bootstrap";

function LogoutButton(){
    const { logout } = useAuth0();
    return (
        <NavLink className="nav-link text-white" onClick={() => logout({returnTo: window.location.origin,})}>
            Logout
        </NavLink>
    );
}

export default LogoutButton;