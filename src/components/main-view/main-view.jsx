import React from 'react';
import axios from 'axios'; // It will help to perform an ajax operation to call the movies from myFlix API

import { LoginView } from '../login-view/loging-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

// You’re essentially telling React to create a new MainView component using the generic React.Component template as its foundation.
// Exposing a component makes it available for use by other components, modules, and files
export class MainView extends React.Component { 

  // React will use this constructor method to create the component's state.
  constructor(){ 
    super();      // initializes your component’s state, and without it, you’ll get an error if you try to use this.state inside constructor(). 
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount(){
   /*  axios.get('https://wichoflix.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      }); */
  }


  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  // Condensed code
  render() {
    const { movies, selectedMovie, user } = this.state;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
        {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/>
         ))
        }
      </div>
    );
  }
}

  // This function is what returns the visual representation of the component, in other words, it renders what will be displayed on the screen.                                             
//   render() {
//     const movies = this.state.movies;
//     if (movies.length === 0){
//       return <div className="main-view">The list is empty!</div>;
//     } else {
//       return (
//         <div className="main-view">
//           {movies.map((movie) => {          // The map() method in the code above maps through the movies array, for each element in an array
//             return <div key={movie._id}>{movie.Title}</div>; //
//           })}
//         </div>
//       );
//     }
//   }
// }

// export default MainView;