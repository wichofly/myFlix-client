import React from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import './movie-view.scss';

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      user: null,
    };
  }

  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }

  addFavorite() {
    const token = localStorage.getItem('token');
    const { user, movie } = this.props;
    axios
      .post(
        `https://wichoflix.onrender.com/users/${user.username}/movies/${movie._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response.data);
        user.favoriteMovies.push(movie._id);
        localStorage.setItem('user', JSON.stringify(user));
        alert(`${movie.title} has beeen added to your favorites.`);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  removeFavorite = (movie) => {
    let userString = localStorage.getItem('user');
    const user = JSON.parse(userString);
    let token = localStorage.getItem('token');

    axios
      .delete(
        `https://wichoflix.onrender.com/users/${user.username}/movies/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        alert(`${movie.title} has been removed from your favorites.`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container className="movie-view">
        <div className="box-one">
          <Row>
            <Col>
              <div className="movie-poster">
                <img src={movie.imageURL} width="300" height="450" />
              </div>
            </Col>

            <Col>
              <div className="movie-title">
                <span className="label"></span>
                <span className="value">{movie.title}</span>
              </div>

              <div className="movie-description">
                <span className="label"></span>
                <span className="value">{movie.description}</span>
              </div>
            </Col>
          </Row>
        </div>

        <div className="box-two">
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
        </div>

        <div className="box-three">
          <Row>
            <Col>
              <div className="movie-director">
                <span className="label">Director: </span>
                <span className="value">
                  {' '}
                  <Link to={`/directors/${movie.director.name}`}>
                    <Button
                      className="btn-link-director"
                      style={{
                        color: '#f8fafc',
                        textDecoration: 'none',
                        fontSize: '25px',
                        fontWeight: 'bold',
                      }}
                      variant="link"
                    >
                      {movie.director?.name}
                    </Button>
                  </Link>
                </span>
                {/* <span className="value">{movie.director}</span> */}
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className="movie-genre">
                <span className="label">Genre: </span>
                <span className="value">
                  <Link to={`/genres/${movie.genre.name}`}>
                    <Button
                      className="btn-link-genre"
                      style={{
                        color: '#f8fafc',
                        textDecoration: 'none',
                        fontSize: '25px',
                        fontWeight: 'bold',
                      }}
                      variant="link"
                    >
                      {movie.genre?.name}
                    </Button>
                  </Link>
                </span>
                {/* <span className="value">{movie.genre}</span> */}
              </div>
            </Col>
          </Row>

          {/* <Row>
            <Col>
              <div className="movie-actors">
                <span className="label">Actors: </span>
                <span className="value">{movie.actors.name}</span>
              </div>
            </Col>
          </Row> */}
        </div>

        <div className="box-button">
          <Button
            className="btn-back"
            style={{ fontSize: '20px' }}
            variant="dark"
            onClick={() => {
              onBackClick(null);
            }}
          >
            Back
          </Button>
          <Button
            className="btn-addFav"
            style={{ fontSize: '20px' }}
            variant="dark"
            onClick={() => {
              this.addFavorite();
            }}
          >
            Add to Favorites
          </Button>
        </div>
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
};
