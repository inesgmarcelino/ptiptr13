import React from "react";
import {NavLink} from 'react-router-dom';

function SideBar() {
    return (
            <div className="sidebar col-3 mb-4">
                {/* logo */}
                <a href="/" className="d-flex name-brand align-items-center mb-md-0 me-md-auto link-dark text-decoration-none">EcoMarket
                </a>
                <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="search" placeholder="Pesquisar" aria-label="Search" />
                </form>
                <ul className="nav nav-pills flex-column bottom">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login">
                        Inicie Sessão
                        {/* falta os pontos */}
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/register">
                        Registe-se
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/cart">
                        CART
                        </NavLink>
                    </li>
                </ul>
            </div>
    );
}

export default SideBar;