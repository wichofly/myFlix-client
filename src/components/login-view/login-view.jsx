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
  Navbar,
  Nav,
} from 'react-bootstrap';
import axios from 'axios';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Declare hook for each input error message (in case of invalid)
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  // Validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username is required.');
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr('Username must be at least 5 characters long.');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password is required.');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr('Password must be at least 6 characters long.');
      isReq = false;
    }
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      /* Send a request to the server for authentication */
      axios
        .post('https://wichoflix.herokuapp.com/login', {
          // they should be like my API objects with the first letter lowercase
          username: username,
          password: password,
        })
        // onLoggedIn = (authData) => this.onLoggedIn(authData)
        .then((response) => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch((e) => {
          console.log('no such user');
        });
    }
  };

  return (
    <Container fluid className="my-3 mx-12">
      <Row>
        <Col>
          <CardGroup>
            <Card className="card-login" style={{ background: '#bae1db', marginBottom: '500px' }}>
              <Card.Body className="mt-3">
                <Card.Title
                  className="text-title-login"
                  style={{ fontSize: '3rem' }}
                >
                  Welcome to myFlix
                </Card.Title>
                <Form id="form">
                  <Form.Group
                    className="mb-3 mt-5 w-full"
                    controlId="formUsername"
                  >
                    <Form.Label className="form-label-user">
                      Username:
                    </Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      required
                    />
                    {/* Code to Display username validation error */}
                    {usernameErr && (
                      <p className="validation-message">{usernameErr}</p>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3 w-full" controlId="formPassword">
                    <Form.Label className="form-label-password">
                      Password:
                    </Form.Label>
                    <Form.Control
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      required
                    />
                    {passwordErr && (
                      <p className="validation-message">{passwordErr}</p>
                    )}
                  </Form.Group>

                  <Form.Group
                    className="mb-2 d-flex justify-content-center"
                    controlId="rememberMe"
                  >
                    <Form.Check label="Remember me" />
                  </Form.Group>
                  <Button
                    className="w-full"
                    variant="dark"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
};
