import React, { useState } from 'react'; // using Hooks
import PropTypes from 'prop-types';
import {
  Form,
  Button,
  Card,
  CardGroup,
  Container,
  Col,
  Row,
} from 'react-bootstrap';

import './registration-view.scss';
import axios from 'axios';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // axios.post('https://wichoflix.herokuapp.com/users', {
    //  username: username,
    //  password: password,
    //  emial: email,
    //  birthday: birthday
    // })
    // .then(response => {
    //   const data = response.data;
    //   console.log(data);
    //   window.open('/', '_self');
    //   // The second argument '_sel' is necessary so that
    //   // the page will open in the current tab
    // })
    // .catch(e => {
    //   console.log('error registering the user');
    //   alert('Something wasn\'t entered correctly')
    // })
    console.log(username, password, email, birthday);
    props.onRegistration(username);
  };

  return (
    <Form id="form" className="">
      <h2 className="text-center mt-4 mb-4">Sign Up</h2>
      <Form.Group className="mb-3 w-full" controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Enter a username"
        />
      </Form.Group>

      <Form.Group  className="mb-3 w-full" controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="8"
          placeholder="at least 8 characters"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId='formEmail'>
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
        />
      </Form.Group>

      <Form.Group className="mb-2" controlId='formBirthday'>
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </Form.Group>
      <Button className='w-full' variant="primary" type="submit" onClick={handleSubmit}>
        Register
      </Button>
    </Form>
  );
}

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired,
};
