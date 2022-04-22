import { Container, Nav, Navbar, NavbarBrand, NavDropdown, NavItem, Button } from "react-bootstrap";
import { useState, useEffect } from 'react';
import React from "react";
import logo from './images/logo.png';

function NavigationBar(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [isLoggedin, setIsLoggedin] = useState(false);


    const toggle = () => setIsOpen(!isOpen);


    const [pageOffSet, setPageOffSet] = useState(0);

    const handleScroll = () => {
        const position = window.pageYOffset;
        setPageOffSet(position);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Navbar style={{ zIndex: 10, background: pageOffSet > 400 ? "linear-gradient(to bottom, #36260F, transparent)" : "linear-gradient(to bottom, #00000080, transparent)" }} light expand="md" className="position-fixed w-100 px-4">
            <NavbarBrand className="text-decoration-none text-white fs-4" href="/">
                <img src={logo} style={{ height: 40, width: 155 }} alt="..." />
            </NavbarBrand>

            <Navbar.Toggle onClick={toggle} />
            <Navbar.Collapse id="basic-navbar-nav" isOpen={isOpen}>
                <Nav className="ms-auto" navbar>
                    <NavItem>
                        <Nav.Link className="text-decoration-none text-black fs-5 crimsonText-Regular" to="/">Home</Nav.Link>
                    </NavItem>

                    <NavItem>
                        <Nav.Link className="text-decoration-none text-black fs-5 crimsonText-Regular" to="/">Category</Nav.Link>
                    </NavItem>
                    {isLoggedin ?
                        <>
                            <NavItem>
                                <Nav.Link className="text-decoration-none text-black fs-5 crimsonText-Regular" to="/">Cart</Nav.Link>
                            </NavItem>
                            <NavItem>
                                <Nav.Link className="text-decoration-none text-black fs-5 crimsonText-Regular" to="/">Wishlist</Nav.Link>
                            </NavItem>
                            <NavItem>
                                <Nav.Link className="text-decoration-none text-black fs-5 crimsonText-Regular" to="/">Account</Nav.Link>
                            </NavItem>
                        </>
                        :
                        null}
                        {isLoggedin ?
                        
                        <Button onClick={() => {setIsLogoutOpen(!isLogoutOpen)}} className="border-0 mt-0 fs-5" style={{background: "black"}} size="sm">Logout</Button>:
                        <Button onClick={() => {setIsLoginOpen(!isLoginOpen)}} className="border-0 mt-1  my-auto" style={{background: "black", fontSize: 18}} size="sm">Login</Button>
                  }




                </Nav>
            </Navbar.Collapse>

        </Navbar>
    );
}
export default NavigationBar;