import React from 'react';

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
          <img src={movie.ImageURL} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-genre">
            <span className="label">Genre: </span>
            <span className="value">{movie.Genre}</span>
        </div>
        <div className="movie-name">
            <span className="label">Name: </span>
            <span className="value">{movie.Genre.Name}</span>
        </div>
            <span className="label">Description: </span>
            <span className="value">{movie.Genre.Description}</span>
        <div className="movie-director">
            <span className="label">Director: </span>
            <span className="value">{movie.Director}</span>
        </div>
        <div className="director-name">
            <span className="label">Name: </span>
            <span className="value">{movie.Director.Name}</span>
        </div>
        <div className="director-bio">
            <span className="label">Bio: </span>
            <span className="value">{movie.Director.Bio}</span>
        </div>
        <div className="director-birthyear">
            <span className="label">Birthyear: </span>
            <span className="value">{movie.Director.Birthyear}</span>
        </div>
        <div className="director-deathyear">
            <span className="label">Deathyear: </span>
            <span className="value">{movie.Director.Deathyear}</span>
        </div>
        <div className="movie-actors">
            <span className="label">Actors: </span>
            <span className="value">{movie.Actors}</span>
        </div>
        <div className="movie-year">
            <span className="label">Year: </span>
            <span className="value">{movie.Year}</span>
        </div>
        <div className="movie-score">
            <span className="label">Score: </span>
            <span className="value">{movie.Score}</span>
        </div>
        <div className="movie-rating">
            <span className="label">Rating: </span>
            <span className="value">{movie.Rating}</span>
        </div>
        <button onClick={() => { onBackClick(null); }}>Back</button>

      </div>
    );
  }
}
