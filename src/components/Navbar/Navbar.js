import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NavBar = (props) => {
    let nav = props.user ? 
        <Nav className="ml-auto">
            <Nav.Link href="/form/100000">Add New Checkpoint</Nav.Link>
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
        <Navbar.Brand href="/"><img src="checkpoint-sm.svg" alt="logo"/> Checkpoint</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            {nav}
        </Navbar.Collapse>
    </Navbar>
)}

export default NavBar