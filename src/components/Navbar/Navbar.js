import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'

const NavBar = () => (
    <Navbar bg="primary" variant='dark' expand="lg">
        <Navbar.Brand href="#home"><img src="checkpoint-sm.svg"/> Checkpoint</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
            <Nav.Link href="#home">Login</Nav.Link>
            <Nav.Link href="#home">Signup</Nav.Link>
            <Nav.Link href="#link">Add Daily Progress</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
)

export default NavBar