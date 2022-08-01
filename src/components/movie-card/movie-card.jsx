import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <div onClick={() => onMovieClick(movie)} className="movie-card">{movie.Title}</div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birthyear: PropTypes.string.isRequired,
      Deathyear: PropTypes.string.isRequired
    }),
    Actors: PropTypes.array.isRequired,
    Year: PropTypes.number.isRequired,
    Score: PropTypes.number.isRequired,
    Rating: PropTypes.string.isRequired,
    ImageURL: PropTypes.string,
    Feature: PropTypes.bool
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};