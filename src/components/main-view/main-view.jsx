import React from 'react';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

// You’re essentially telling React to create a new MainView component using the generic React.Component template as its foundation.
// Exposing a component makes it available for use by other components, modules, and files
export class MainView extends React.Component { 

  // React will use this constructor method to create the component's state.
  constructor(){ 
    super();      // initializes your component’s state, and without it, you’ll get an error if you try to use this.state inside constructor(). 
    this.state = {
      movies: [
        { _id: 1, Title: 'Inception', Description: 'desc1...', ImagePath: '...'},
        { _id: 2, Title: 'The Shawshank Redemption', Description: 'desc2...', ImagePath: '...'},
        { _id: 3, Title: 'Gladiator', Description: 'desc3...', ImagePath: '...'}
      ],
      selectedMovie: null
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  // Condensed code
  render() {
    const { movies,selectedMovie } = this.state;
  
    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
  
    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
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