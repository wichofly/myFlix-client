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
import axios from 'axios';

import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  // Declare hook for each input error message (when invalid)
  const [values, setValues] = useState({
    usernameErr: '',
    passwordErr: '',
    emailErr: '',
    birthdayErr: '',
  });

  const validate = () => {
    let isReq = true;
    setValues((prev) => {
      return {
        usernameErr: '',
        passwordErr: '',
        emailErr: '',
        birthdayErr: '',
      };
    });
    if (!username) {
      // setValues re-defines values through a callback that receives
      // the previous state of values & must return values updated
      setValues((prevValues) => {
        return { ...prevValues, usernameErr: 'Username is required.' };
      });
      isReq = false;
    } else if (username.length < 5) {
      setValues((prevValues) => {
        return {
          ...prevValues,
          usernameErr: 'Username must be at least 5 characters long.',
        };
      });
    }
    if (!password) {
      setValues((prevValues) => {
        return { ...prevValues, passwordErr: 'Password is required.' };
      });
      isReq = false;
    } else if (password.length < 6) {
      setValues((prevValues) => {
        return {
          ...prevValues,
          passwordErr: 'Password must be at least 6 characters long.',
        };
      });
      isReq = false;
    }
    if (!email) {
      setValues({
        ...values,
        emailErr: 'Email is required.',
      });
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setValues((prevValues) => {
        return { ...prevValues, emailErr: 'Enter a valid email address.' };
      });
      isReg = false;
    }
    if (!birthday) {
      setValues((prevValues) => {
        return { ...prevValues, birthdayErr: 'Enter a valid date.' };
      });
      isReq = false;
    }
    return isReq;
  };

  const handleSubmit = (event) => {
    // Should i use handelRegister instead of handleSubmit???
    event.preventDefault();
    const isReq = validate();
    if (isReq) {
      // Send a POST request to /users endpoint to register & getting credentials
      axios
        .post('https://wichoflix.herokuapp.com/users', {
          username: username,
          password: password,
          email: email,
          birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          window.open('/', '_self');
        })
        .catch((e) => {
          console.log('error registering the user.');
        });
    }
  };

  return (
    <Container fluid className="registerContainer my-3 mx-12">
      <Row>
        <Col>
          <CardGroup>
            <Card
              className="card-registration"
              style={{ background: '#bae1db', marginBottom: '500px' }}
            >
              <Card.Body>
                <Card.Title
                  className="text-title-registration"
                  style={{ fontSize: '3rem' }}
                >
                  Sign Up
                </Card.Title>
                <Form id="">
                  <div className="first-box">
                    <Form.Group className="mb-3" controlId="formUsername">
                      <Form.Label className="form-label-user">
                        Username:
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="Enter a username"
                      />
                      {/* // code added here to display a validation error */}
                      {values.usernameErr && (
                        <p className="validation-message">
                          {values.usernameErr}
                        </p>
                      )}
                    </Form.Group>

                    <Form.Group
                      style={{ marginLeft: '30px' }}
                      className="mb-3"
                      controlId="formPassword"
                    >
                      <Form.Label className="form-label-password">
                        Password:
                      </Form.Label>
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength="8"
                        placeholder="at least 8 characters"
                      />
                      {values.passwordErr && (
                        <p className="validation-message">
                          {values.passwordErr}
                        </p>
                      )}
                    </Form.Group>
                  </div>

                  <div className="second-box">
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label className="form-label-email">
                        Email:
                      </Form.Label>
                      <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Email"
                      />
                      {values.emailErr && (
                        <p className="validation-message">{values.emailErr}</p>
                      )}
                    </Form.Group>

                    <Form.Group
                      style={{ marginLeft: '50px' }}
                      className="mb-3"
                      controlId="formBirthday"
                    >
                      <Form.Label className="form-label-birthday">
                        Birthday:
                      </Form.Label>
                      <Form.Control
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                      />
                      {values.birthdayErr && (
                        <p className="validation-message">
                          {values.birthdayErr}
                        </p>
                      )}
                    </Form.Group>
                  </div>
                  <Button
                    className="w-full"
                    variant="dark"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Register
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

RegistrationView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string,
  }),
};
