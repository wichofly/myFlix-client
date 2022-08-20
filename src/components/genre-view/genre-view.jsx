import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Col, Row } from 'react-bootstrap';

import './genre-view.scss';

export class GenreView extends React.Component {
  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Container>
        <div className="genre-view">
          <Row className="genre-name mt-3">
            <Col className="label">Genre:</Col>
            <Col className="value">{genre.name}</Col>
          </Row>
          <Row className="genre-description mt-3">
            <Col className="label">Description:</Col>
            <Col className="value">{genre.description}</Col>
          </Row>
        </div>
        <Button
          className="btn-back-genre"
          style={{ fontSize: '20px' }}
          variant="dark"
          onClick={() => {
            onBackClick();
          }}
        >
          Back
        </Button>
      </Container>
    );
  }
}
GenreView.propTypes = {
  genre: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
