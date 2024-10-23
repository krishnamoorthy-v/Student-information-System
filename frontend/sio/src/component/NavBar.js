import React from 'react';
import {Nav, Navbar, Container} from 'react-bootstrap';

const NavBar = () => {
    return (
     
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Info System</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/student">Student</Nav.Link>
             
          </Nav>
        </Container>
      </Navbar>
      
    );
};

export default NavBar