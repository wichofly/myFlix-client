import React from 'react';
import { Container } from 'react-bootstrap'; // It is another way to import Bootstrap component without "/container" but using "{}" at the begininng
import ReactDOM from 'react-dom/client';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

// now is exported with default component, that's wy the curly braces were removed
import MainView from './components/main-view/main-view';
// Import statement to indicate that you need to bundle
import './index.scss';
import moviesApp from './reducers/reducers';

const store = createStore(moviesApp, devToolsEnhancer());

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <MainView />
        </Container>
      </Provider>
    );
  }
}

// Finds the root of your app
// const root = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
// ReactDOM.render(React.createElement(MyFlixApplication), container);

// Correcting warning "ReactDOM.render is no longer supported in React 18"
const root = ReactDOM.createRoot(
  document.getElementsByClassName('app-container')[0]
);
root.render(
  <React.StrictMode>
    <MyFlixApplication />
  </React.StrictMode>
);
