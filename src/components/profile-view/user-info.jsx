import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';

function UserInfo({ email, name, password, birthday }) {
  return (
    <Container>
      <Row>
        <h4>Your Info</h4>
      </Row>
      <Row>
        <Col className="label">Username: </Col>
        <Col className="value">{name}</Col>
      </Row>

      {/* <Row>
        <Col className="label">Password: </Col>
        <Col className="value">{password}</Col>
      </Row> */}

      <Row>
        <Col className="label">Email: </Col>
        <Col className="value">{email}</Col>
      </Row>

      <Row>
        <Col className="label">Birthday: </Col>
        <Col className="value">{birthday}</Col>
      </Row>
    </Container>
  );
}

export default UserInfo;
