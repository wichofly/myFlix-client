import React from 'react';
import axios from 'axios'; // It will help to perform an ajax operation to call the movies from myFlix API
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { Menubar } from '../navbar/navbar';

import './main-view.scss';

// You’re essentially telling React to create a new MainView component using the generic React.Component template as its foundation.
// Exposing a component makes it available for use by other components, modules, and files
export class MainView extends React.Component {
  // React will use this constructor method to create the component's state.
  constructor() {
    super(); // initializes your component’s state, and without it, you’ll get an error if you try to use this.state inside constructor().
    this.state = {
      movies: [],
      user: null,
      // selectedMovie: null,
      // register: null,
    };
  }

  getMovies(token) {
    axios
      .get('https://wichoflix.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` }, // By passing bearer authorization in the header of your HTTP requests, I can make authenticated requests to my API.
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      });
      this.getMovies(accessToken);
    }
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.username,
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.getMovies(authData.token);
  }

  // Condensed code
  render() {
    const { movies, user } = this.state; // Deconstructing

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user)
      return (
        <Row>
          <Col>
            <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
          </Col>
        </Row>
      );
    // Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Router>
        <Menubar user={user} />
        <Row className="main-view justify-content-md-center">
          <Route
            exact
            path="/"
            render={() => {
              /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
              if (!user) return;
              <Col>
                <LoginView
                  movies={movies}
                  onLoggedIn={(user) => this.onLoggedIn(user)}
                />
              </Col>;
              //Before movies are loaded
              if (movies.length === 0) return <Row className="main-view" />; //Might need to change row to div
              return movies.map((m) => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ));
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
              return (
                <Col md={8}>
                  <MovieView
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
              if (movies.length === 0) return <Row className="main-view" />;
              return (
                <Col md={8}>
                  <GenreView
                    genre={
                      movies.find((m) => m.Genre.Name === match.params.name)
                        .Genre
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
              if (movies.length === 0) return <Row className="main-view" />;
              return (
                <Col md={8}>
                  <DirectorView
                    director={
                      movies.find((m) => m.director.name === match.params.name)  //Trying to see with lowercase as my database
                        .director // ".Director" is looping to find drirector name
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          <Route
            path={`/users/${user}`}
            render={({ match, history }) => {
              if (!user) return <Redirect to="/" />;
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
              if (!user) return <Redirect to="/" />;
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

// export default MainView;
