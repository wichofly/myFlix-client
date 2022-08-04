import React from 'react';
import axios from 'axios'; // It will help to perform an ajax operation to call the movies from myFlix API
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

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

  // Logout function
  // onLoggedOut() {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('user');
  //   this.setState({
  //     user: null,
  //   });
  // }

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
  // setSelectedMovie(movie) {
  //   this.setState({
  //     selectedMovie: movie,
  //   });
  // }

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

  // When an user succesfully register, this function updates the user properties
  // onRegistration(registered) {
  //   this.setState({
  //     registered,
  //   });
  // }

  // Condensed code
  render() {
    const { movies, user } = this.state; // Deconstructing

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user) return;
    <Row>
      <Col>
        <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
      </Col>
    </Row>;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    // if (!registered)
    //   return (
    //     <RegistrationView
    //       onRegistration={(register) => this.onRegistration(register)}
    //     />
    //   );

    // Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Router>
        <Row className="main-view justify-content-md-center">
          <Route
            exact
            path="/"
            render={() => {
              return movies.map((m) => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ));
            }}
          />
          <Route
            path="/movies/:movieId"
            render={({ match }) => {
              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
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
