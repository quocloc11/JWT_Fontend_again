import React, { useEffect, useState, useContext } from 'react';
import './Nav.scss'
import { NavLink, useLocation } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../logo.png'
const NavHeader = (props) => {
    const { user } = useContext(UserContext)
    const location = useLocation()
    if (user && user.isAuthenticated === true || location.pathname === '/') {
        return (
            <>
                {/* <div className="topnav">
                    <NavLink to="/" exact>Home</NavLink>
                    <NavLink to="/users">Users</NavLink>
                    <NavLink to="/projects">Projects</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div> */}
                <div className='nav-header'>
                    <Navbar bg='header' expand="lg" className="bg-body-tertiary">
                        <Container>
                            <Navbar.Brand href="#home">
                                <img
                                    src={logo}
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                //alt="React Bootstrap logo"
                                />
                                <span className='brand-name'>
                                    React

                                </span>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <NavLink to="/" exact className="nav-link">Home</NavLink>

                                    <NavLink to="/users" exact className="nav-link">Users</NavLink>
                                    <NavLink to="/projects" exact className="nav-link">Projects</NavLink>
                                    <NavLink to="/about" exact className="nav-link">About</NavLink>
                                </Nav>
                                <Nav>
                                    <Nav.Item className='nav-link'>
                                        Welcome QuocLoc
                                    </Nav.Item>
                                    <NavDropdown title="Settings" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">Change Password</NavDropdown.Item>

                                        <NavDropdown.Item href="#action/3.3">Log Out</NavDropdown.Item>

                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            </>
        );
    }
    else {
        return <></>
    }
}
export default NavHeader;