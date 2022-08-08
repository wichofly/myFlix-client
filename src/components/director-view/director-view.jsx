import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Col, Row } from 'react-bootstrap';

import './director-view.scss';

export class DirectorView extends React.Component {
  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }

  render() {
    const { director, onBackClick } = this.props;

    return (
      <Container className="director-view">
        <Row className="mt-3">
          <Col className="label">Director: </Col>
          <Col className="value">{director.name}</Col>
          <Row className="mt-3">
            <Col className="label">Bio: </Col>
            <Col className="value">{director.bio}</Col>
          </Row>
          <Row className="mt-3">
            <div>
              <Col className="label">Birth: </Col>
              <Col className="value mt-3 ml-3 ">{director.birthyear}</Col>.
            </div>
          </Row>
          <Row className="mt-3">
            <div>
              <Col className="label">Death: </Col>
              <Col className="value mt-3 ml-3 ">{director.deathyear}</Col>.
            </div>
          </Row>
          <Row>
            <Col>
              <div>
                <Button
                  className=""
                  onClick={() => {
                    onBackClick();
                  }}
                >
                  Back
                </Button>
              </div>
            </Col>
          </Row>
        </Row>
      </Container>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    birth: PropTypes.string,
    death: PropTypes.string,
  }).isRequired,
};
