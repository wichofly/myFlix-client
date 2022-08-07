import React from 'react';
import { Container, Col, Row, Button, Form } from 'react-bootstrap';

function UpdateUser({ handleSubmit, handleUpdate, user }) {
  return (
    <Form className="profile-form" onSubmit={(e) => handleSubmit(e)}>
      <h2>Edit User Info</h2>
      <label>Username:</label>
      <input
        type="text"
        name="username"
        defaultValue={user.username}
        onChange={(e) => handleUpdate(e)}
      />
      <label>Password:</label>
      <input
        type="password"
        name="password"
        defaultValue={user.password}
        onChange={(e) => handleUpdate(e)}
      />
      <label>Email:</label>
      <input
        type="email"
        name="email"
        defaultValue={user.email}
        onChange={(e) => handleUpdate(e)}
      />
      <button variant="primary" type="submit">
        Update
      </button>
    </Form>
  );
}

export default UpdateUser;
