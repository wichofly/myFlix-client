export const SET_MOVIES = 'SET_MOVIES'
export const SET_FILTER = 'SET_FILTER'

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