import React, { useEffect, useState, useContext } from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { authenticatorContext } from '../App';

const NavBar = () => {
  const {isauthenticated, setAuthenticated} = useContext(authenticatorContext);


  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Info System</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/student">Student</Nav.Link>
        </Nav>

        { isauthenticated ? (
            <Nav className="me-right">
              <Nav.Link href='/login' onClick={()=>{localStorage.setItem("isauthenticated", JSON.stringify(false))}} >Log Out</Nav.Link>
            </Nav>
             ) : (
            <Nav className='me-right'>
              <Nav.Link  href='/login'>Login</Nav.Link>
            </Nav>
          )
        }

      </Container>
    </Navbar>
  );
};

export default NavBar;
