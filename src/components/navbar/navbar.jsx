import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

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
      style={{ height: '70px' }}
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
            className="ml-auto"
            style={{ textDecoration: 'none', fontSize: '1.5rem', marginLeft: 'auto' }}
          >
            {user
              ? isAuth() && (
                  <Nav.Link href={`/users/${user.username}`}>
                    {user.username}
                  </Nav.Link>
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
            {!isAuth() && <Nav.Link href="/">Sign-in</Nav.Link>}
            {!isAuth() && <Nav.Link href="/register">Sign-up</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
