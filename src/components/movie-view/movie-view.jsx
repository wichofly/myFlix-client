import React from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './movie-view.scss';

export class MovieView extends React.Component {
  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container className="movie-view">
        <Row>
          <Col>
            <div className="movie-poster">
              <img src={movie.imageURL} width="200" height="200" />
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="movie-title">
              <span className="label">Title: </span>
              <span className="value">{movie.title}</span>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="movie-description">
              <span className="label">Description: </span>
              <span className="value">{movie.description}</span>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="movie-genre">
              <span className="label">Genre: </span>
              {/* <span className="value">{movie.genre}</span> */}
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="movie-name">
              <span className="label">Name: </span>
              <span className="value">{movie.genre?.name}</span>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <span className="label">Description: </span>
            <span className="value">{movie.genre?.description}</span>
          </Col>
        </Row>

        <Link to={`/directors/${movie.director.name}`}>
          <Button variant="link">Director</Button>
        </Link>

        <Link to={`/genres/${movie.genre.name}`}>
          <Button variant="link">Genre</Button>
        </Link>

        <Row>
          <Col>
            <div className="movie-director">
              <span className="label">Director: </span>
              {/* <span className="value">{movie.director}</span> */}
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="director-name">
              <span className="label">Name: </span>
              <span className="value">{movie.director?.name}</span>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="director-bio">
              <span className="label">Bio: </span>
              <span className="value">{movie.director?.bio}</span>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="director-birthyear">
              <span className="label">Birthyear: </span>
              <span className="value">{movie.director?.birthyear}</span>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="director-deathyear">
              <span className="label">Deathyear: </span>
              <span className="value">{movie.director?.deathyear}</span>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="movie-actors">
              <span className="label">Actors: </span>
              {/* <span className="value">{movie.actors}</span> */}
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="movie-year">
              <span className="label">Year: </span>
              <span className="value">{movie.year}</span>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="movie-score">
              <span className="label">Score: </span>
              <span className="value">{movie.score}</span>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="movie-rating">
              <span className="label">Rating: </span>
              <span className="value">{movie.rating}</span>
            </div>
          </Col>
        </Row>

        <Button
          onClick={() => {
            onBackClick(null);
          }}
        >
          Back
        </Button>
      </Container>
    );
  }
}

MovieView.propTypes = {
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
