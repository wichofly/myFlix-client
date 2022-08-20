import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Row>
        <Col>
          <Card className="card-main">
            <Card.Img variant="top" src={movie.imageURL} />
            <Card.Body className="card-body-main">
              <Card.Title className="card-title-main">{movie.title}</Card.Title>
              <Card.Text className="card-text-main">
                {movie.description}
                <Link to={`/movies/${movie._id}`}>
                  <Button className="btn-link" variant="link">
                    Open
                  </Button>
                </Link>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageURL: PropTypes.string,
  }).isRequired,
};
