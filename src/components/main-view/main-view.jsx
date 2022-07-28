import React from 'react';

// You’re essentially telling React to create a new MainView component using the generic React.Component template as its foundation.
// Exposing a component makes it available for use by other components, modules, and files
export class MainView extends React.Component {  

  // This function is what returns the visual representation of the component, in other words, it renders what will be displayed on the screen.                                             
  render() {
    return (
      <div className="main-view">
        <div>Inception</div>
        <div>The Shawshank Redemption</div>
        <div>Gladiator</div>
      </div>
    );
  }
}