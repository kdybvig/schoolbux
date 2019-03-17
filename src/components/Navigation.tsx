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
    const { user, logout, isAuth } = useContext(UserContext)

    const setLinks = () => {
        return isAuth ? 
            [
                {icon:<FontAwesomeIcon icon={faStoreAlt}/>, label:' Store', location: '/store'}
            ] : 
            []
    }
    
    const links = setLinks();
 
    return (
        <div>
            <Navbar expand='md' fixed='top' bg='dark-grey' variant='dark' className="d-flex">
                <LinkContainer to="/">  
                    <Navbar.Brand>School Bux</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle />
                <Navbar.Collapse> 
                    <Nav className='ml-auto'>
                        {
                            links.map((link,index) => {
                                const {icon, label, location} = link;
                                return (
                                    <LinkContainer to={location}>
                                        <Nav.Link active={window.location.pathname === location}>{icon}{label}</Nav.Link>
                                    </LinkContainer>
                                )
                            })
                        }
                        {/* <LinkContainer to="/store">
                            <Nav.Link active={window.location.pathname === '/store'}><FontAwesomeIcon icon={faStoreAlt}/> Store</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/wishlist">
                            <Nav.Link active={window.location.pathname === '/wishlist'}><FontAwesomeIcon icon={faClipboardList}/> Wishlist</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/cart">
                            <Nav.Link active={window.location.pathname === '/cart'}><FontAwesomeIcon icon={faShoppingCart}/> Cart</Nav.Link>
                        </LinkContainer> */}
                        {
                            user? 
                                <NavDropdown alignRight title={<span><FontAwesomeIcon icon={faUserCircle}/> {user}</span>} id="nav-dropdown">
                                    <NavDropdown.Item>Settings</NavDropdown.Item>
                                    <NavDropdown.Item>My Profile</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <LinkContainer to="/login">
                                        <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown> : 
                                <NavDropdown alignRight title={<span><FontAwesomeIcon icon={faUserCircle}/> Account</span>} id="nav-dropdown">
                                    <LinkContainer to="/login">
                                        <NavDropdown.Item>Sign In</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/register">
                                        <NavDropdown.Item>Create An Account</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
    
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>;
        </div>
    )
}

export default Navigation;