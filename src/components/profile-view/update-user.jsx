import React from 'react';
import { Container, Col, Row, Button, Form } from 'react-bootstrap';

function UpdateUser({ handleSubmit, handleUpdate, user }) {
  return (
    <Form className="profile-form" onSubmit={(e) => handleSubmit(e)}>
      <h2>Edit User Info</h2>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          name="username"
          defaultValue={user.username}
          onChange={(e) => handleUpdate(e)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          name="password"
          defaultValue={user.password}
          onChange={(e) => handleUpdate(e)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          name="email"
          defaultValue={user.email}
          onChange={(e) => handleUpdate(e)}
        />
      </Form.Group>

      <Button className='mt-3' variant="primary" type="submit">
        Update
      </Button>
    </Form>
  );
}

export default UpdateUser;
