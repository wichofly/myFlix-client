import React from 'react';
import axios from 'axios'; // It will help to perform an ajax operation to call the movies from myFlix API
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { Menubar } from '../navbar/navbar';
import { ProfileView } from '../profile-view/profile-view';
// #0 impot relevant actions
import { setMovies } from '../../actions/actions';
// we haven't written this one yet
import MoviesList from '../movies-list/movies-list';
/* 
  #1 The rest of components import statements but without the MovieCard's 
  because it will be imported and used in the MoviesList component rather
  than in here. 
*/

import './main-view.scss';

// You’re essentially telling React to create a new MainView component using the generic React.Component template as its foundation.
// Exposing a component makes it available for use by other components, modules, and files.
// #2 export keyword removed from here
class MainView extends React.Component {
  // React will use this constructor method to create the component's state.
  constructor() {
    super(); // initializes your component’s state, and without it, you’ll get an error if you try to use this.state inside constructor().
    // #3 movies state removed from here
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      // was saved only the username in the local storage, not the object (not the hole information)
      // then when it was taken out the user from the local storage, it was saved it into user (setState), but in the moment, user was not a user object, but only a usename
      const userString = localStorage.getItem('user');
      const user = JSON.parse(userString);
      this.setState({
        user,
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios
      .get('https://wichoflix.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` }, // By passing bearer authorization in the header of your HTTP requests, I can make authenticated requests to my API.
      })
      .then((response) => {
        this.props({
          // #4 change movies to setMovies
          setMovies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user,
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', JSON.stringify(authData.user));
    this.getMovies(authData.token);
  }

  // Condensed code
  render() {
    // #5 movies is extracted from this.props rather than from this.state
    let { movies } = this.props;
    let { user } = this.state;

    return (
      <Router>
        <Menubar user={user} />
        <Row className="main-view mt-3 justify-content-md-center">
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <Col lg={8} md={8}>
                    <LoginView
                      onLoggedIn={(authData) => this.onLoggedIn(authData)}
                    />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              // #6 
              return <MovieList movies={movies} />;
            }}
          />

          <Route
            path="/register"
            render={() => {
              if (user) return <Redirect to="/" />;
              return (
                <Col lg={8} md={8}>
                  <RegistrationView />
                </Col>
              );
            }}
          />

          <Route
            path="/movies/:movieId"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView
                      onLoggedIn={(authData) => this.onLoggedIn(authData)}
                    />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <MovieView
                    user={user}
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/genres/:name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView
                      onLoggedIn={(authData) => this.onLoggedIn(authData)}
                    />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <GenreView
                    genre={
                      movies.find((m) => m.genre.name === match.params.name)
                        .genre
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/directors/:name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView
                      onLoggedIn={(authData) => this.onLoggedIn(authData)}
                    />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <DirectorView
                    director={
                      movies.find((m) => m.director.name === match.params.name)
                        .director
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path={user ? `/users/${user.username}` : '/users/undefined'}
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView
                      onLoggedIn={(autData) => this.onLoggedIn(autData)}
                    />
                  </Col>
                );
              return (
                <Col>
                  <ProfileView
                    movies={movies}
                    user={user}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path={`/user-update/${user}`}
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              return (
                <Col>
                  <UserUpdate
                    user={user}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
        </Row>
      </Router>
    );
  }
}

// #7
let mapStateToProps = (state) => {
  return {
    movies: state.movies,
    user: state.user,
  };
};

// #8
export default connect(mapStateToProps, { setMovies })(MainView);

