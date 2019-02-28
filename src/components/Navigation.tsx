import React, { FunctionComponent, useState } from 'react';
import './Navigation.css';
import {Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Home from './Home';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faClipboardList, faStoreAlt, faUserCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import Store from './Store';

const Navigation:FunctionComponent = () => {

    return (
        <div>
            <Navbar expand='md' fixed='top' bg='dark-grey' variant='dark' className="d-flex">
                <LinkContainer to="/home">  
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
                        <NavDropdown alignRight title={<span><FontAwesomeIcon icon={faUserCircle}/> kmurgic</span>} id="collasible-nav-dropdown">
                            <NavDropdown.Item>Settings</NavDropdown.Item>
                            <NavDropdown.Item>My Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>;
            <div className='main'>
                <Route exact path="/home" component={Home}/>
                <Route exact path="/store" component={Store}/>
            </div>
        </div>
    )
}

export default Navigation;