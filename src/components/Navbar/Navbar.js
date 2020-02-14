import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'

const NavBar = (props) => {
    let nav = props.user ? 
        <Nav className="ml-auto">
            <Nav.Link href="#link">Add Daily Progress</Nav.Link>
            <Nav.Link href="" onClick={ props.handleLogout }>Logout</Nav.Link>
        </Nav>
        :
        <Nav className="ml-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup">Signup</Nav.Link>
        </Nav>

    return (
    <Navbar bg="primary" variant='dark' expand="lg">
        <Navbar.Brand href="#home"><img src="checkpoint-sm.svg"/> Checkpoint</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            {nav}
        </Navbar.Collapse>
    </Navbar>
)}

export default NavBar