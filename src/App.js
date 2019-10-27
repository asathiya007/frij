import React from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation";

class App extends React.Component {
  constructor() {
    super(); 
    this.state = {
      route: "signin"
    }
  }

  onRouteChange = (route) => {
    this.setState({route});
  }

  render() {
    const {route} = this.state; 

    return (
      <div>
        <Navigation route={route} onRouteChange={this.onRouteChange}/>
      </div>
    );
  }
}

export default App;
