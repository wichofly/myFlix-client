export const SET_MOVIES = 'SET_MOVIES'
export const SET_FILTER = 'SET_FILTER'
export const SET_USER = 'SET_USER';
export const ADD_FAVMOVIE = 'ADD_FAVMOVIE';
export const REM_FAVMOVIE = 'REM_FAVMOVIE';

// The reason for exporting functions is convinience: I'll be able to call the from whereever I want to perform said actions. 
export function setMovies(value) {
  return {
    type: SET_MOVIES,
    value
  }
}

export function setFilter(value) {
  return {
    type: SET_FILTER,
    value
  }
}

export function setUser(value) {
  return {
    type: SET_USER,
    value
  }
}