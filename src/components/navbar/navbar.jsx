import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function Menubar({ user }) {
  const onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  };

  const isAuth = () => {
    if (typeof window == 'undefined') {
      return false;
    }
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } else {
      return false;
    }
  };

  return (
    <Navbar
      className="main-nav"
      // style={{ height: '70px' }}
      sticky="top"
      bg="dark"
      expand="lg"
      variant="dark"
    >
      <Container>
        <Navbar.Brand
          className="navbar-logo"
          style={{ fontSize: '2rem', fontWeight: 'bold' }}
          href="/"
        >
          myFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav
            // className="ml-auto"
            style={{
              textDecoration: 'none',
              fontSize: '1.5rem',
              marginLeft: 'auto',
            }}
          >
            {user
              ? isAuth() && (
                  <Link to={`/users/${user.username}`}>
                    <Nav.Link href={`/users/${user.username}`}>
                      Profile
                    </Nav.Link>
                  </Link>
                )
              : null}
            {isAuth() && (
              <Button
                style={{ textDecoration: 'none', fontSize: '1.5rem' }}
                variant="link"
                onClick={() => {
                  onLoggedOut();
                }}
              >
                Logout
              </Button>
            )}
            {!isAuth() && (
              <Link to="/">
                <Nav.Link href="/">Login</Nav.Link>
              </Link>
            )}
            {!isAuth() && (
              <Link to="/register">
                <Nav.Link href="/register">Register</Nav.Link>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
