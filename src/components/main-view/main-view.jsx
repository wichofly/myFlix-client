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
        { _id: 1, Title: 'Forest Gump', Description: 'Forrest Gump, an innocent and kind-hearted Alabama boy, has been dealing with other peoples unkindness nearly all his life. Having grown up with beautiful Jenny, his only friend, Forrest yearns to learn all about the ways of the world and embarks on a mission to find his true purpose in life.', Genre: 'Drama', Director: 'Robert Zemeckis', ImagePath: 'https://www.imdb.com/title/tt0109830/mediaviewer/rm1954748672/?ref_=tt_ov_i'},
        { _id: 2, Title: 'The Shawshank Redemption', Description: 'It tells the story of banker, who is sentenced to life in Shawshank State Penitentiary for the murders of his wife and her lover, despite his claims of innocence.', Genre: 'Drama', Director: 'Frank Darabont', ImagePath: 'https://www.imdb.com/title/tt0111161/mediaviewer/rm10105600/?ref_=tt_ov_i'},
        { _id: 3, Title: 'Gladiator', Description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.', Genre:'Action', Director:"Ridley Scott", ImagePath: 'https://www.imdb.com/title/tt0172495/mediaviewer/rm2442542592/?ref_=tt_ov_i'}
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