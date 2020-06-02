import React, {useState} from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };
    return (
        <Navbar color="dark" dark  expand="md">
            <NavbarBrand exact tag={RRNavLink} to="/">simple react and flask app</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar >
                    <NavItem>
                        <NavLink exact  to="/" activeClassName="active" tag={RRNavLink}>Compose email</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink exact to="/mange" activeClassName="active" tag={RRNavLink}>Mange</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    );
}

Header.propTypes = {};

export default Header;