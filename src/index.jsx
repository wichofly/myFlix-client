import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from "react-dom/client";
// MainView is in enclosed in curly braces because was exported without the "default" keyword in "main-view.jsx"
import { MainView } from './components/main-view/main-view';


// Import statement to indicate that you need to bundle
import './index.scss';

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <MainView />
    );
  }
}

// Finds the root of your app
// const root = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
// ReactDOM.render(React.createElement(MyFlixApplication), container);

// Correcting warning "ReactDOM.render is no longer supported in React 18"
const root = ReactDOM.createRoot(document.getElementsByClassName('app-container')[0]);
root.render(
  <React.StrictMode>
    <MyFlixApplication />
  </React.StrictMode>
);