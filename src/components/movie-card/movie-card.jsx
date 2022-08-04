import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Img variant="top" src={movie.imageURL} />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.description}</Card.Text>
                <Button onClick={() => onMovieClick(movie)} variant="link">
                  Open
                </Button>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      birthyear: PropTypes.string.isRequired,
      deathyear: PropTypes.string,
    }),
    actors: PropTypes.array.isRequired,
    year: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    rating: PropTypes.string.isRequired,
    imageURL: PropTypes.string,
    feature: PropTypes.bool,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
