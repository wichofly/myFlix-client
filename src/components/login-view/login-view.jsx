import React, { useState } from 'react'; // using Hooks
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    <Form id='form' className='d-grid h-100'>
      <h2 className='text-center mt-4 mb-4'>Login</h2>
      <Form.Group className="mb-3 w-full" controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username"
        />
      </Form.Group>

      <Form.Group className="mb-3 w-full" controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          onChange={(e) => setPassword(e.target.value)} placeholder="Password"
        />
      </Form.Group>

      <Form.Group className="mb-2 d-flex justify-content-center" controlId="rememberMe">
        <Form.Check label='Remember me' />
      </Form.Group>
      <Button className='w-full' variant="primary" type="submit" onClick={handleSubmit} >
        Submit
      </Button>
    </Form>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};
