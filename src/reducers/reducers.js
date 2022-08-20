import { combineReducers } from 'redux';

import { SET_MOVIES, SET_FILTER, SET_USER, ADD_FAVMOVIE, REM_FAVMOVIE } from '../actions/actions';

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function user(state = '', action) {
  switch (action.type) {
    case SET_USER:
      return action.value;
    default:
      return state;
  }
}

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  movies,
  user,
  visibilityFilter
});

// exporting just the combineReducers to be available anywhere in the app.
export default moviesApp; 
