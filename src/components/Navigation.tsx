import React, { FunctionComponent, useState, useContext } from 'react';
import './Navigation.css';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faClipboardList, faStoreAlt, faUserCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from './UserProvider'

const Navigation:FunctionComponent = () => {
    const { user, logout } = useContext(UserContext)

    return (
        <div>
            <Navbar expand='md' fixed='top' bg='dark-grey' variant='dark' className="d-flex">
                <LinkContainer to="/">  
                    <Navbar.Brand>School Bux</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle />
                <Navbar.Collapse> 
                    <Nav className='ml-auto'>
                        <LinkContainer to="/store">
                            <Nav.Link active={window.location.pathname === '/store'}><FontAwesomeIcon icon={faStoreAlt}/> Store</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/wishlist">
                            <Nav.Link active={window.location.pathname === '/wishlist'}><FontAwesomeIcon icon={faClipboardList}/> Wishlist</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/cart">
                            <Nav.Link active={window.location.pathname === '/cart'}><FontAwesomeIcon icon={faShoppingCart}/> Cart</Nav.Link>
                        </LinkContainer>
                        {
                            user? 
                                <NavDropdown alignRight title={<span><FontAwesomeIcon icon={faUserCircle}/> {user}</span>} id="collasible-nav-dropdown">
                                    <NavDropdown.Item>Settings</NavDropdown.Item>
                                    <NavDropdown.Item>My Profile</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                                </NavDropdown> : 
                                <LinkContainer to="/login">
                                    <Nav.Link active={window.location.pathname === '/login'}>Sign In</Nav.Link>
                                </LinkContainer>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>;
        </div>
    )
}

export default Navigation;