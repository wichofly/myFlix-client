import React from 'react';
import {Button, Row, Col} from 'react-bootstrap';

import "./movie-view.scss";

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
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.imageURL} width="200" height="200" />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.description}</span>
        </div>
        <div className="movie-genre">
            <span className="label">Genre: </span>
            {/* <span className="value">{movie.genre}</span> */}
        </div>
        <div className="movie-name">
            <span className="label">Name: </span>
            <span className="value">{movie.genre?.name}</span>
        </div>
            <span className="label">Description: </span>
            <span className="value">{movie.genre?.description}</span>
        <div className="movie-director">
            <span className="label">Director: </span>
            {/* <span className="value">{movie.director}</span> */}
        </div>
        <div className="director-name">
            <span className="label">Name: </span>
            <span className="value">{movie.director?.name}</span>
        </div>
        <div className="director-bio">
            <span className="label">Bio: </span>
            <span className="value">{movie.director?.bio}</span>
        </div>
        <div className="director-birthyear">
            <span className="label">Birthyear: </span>
            <span className="value">{movie.director?.birthyear}</span>
        </div>
        <div className="director-deathyear">
            <span className="label">Deathyear: </span>
            <span className="value">{movie.director?.deathyear}</span>
        </div>
        <div className="movie-actors">
            <span className="label">Actors: </span>
            {/* <span className="value">{movie.actors}</span> */}
        </div>
        <div className="movie-year">
            <span className="label">Year: </span>
            <span className="value">{movie.year}</span>
        </div>
        <div className="movie-score">
            <span className="label">Score: </span>
            <span className="value">{movie.score}</span>
        </div>
        <div className="movie-rating">
            <span className="label">Rating: </span>
            <span className="value">{movie.rating}</span>
        </div>
        <Button onClick={() => { onBackClick(null); }}>Back</Button>

      </div>
    );
  }
}