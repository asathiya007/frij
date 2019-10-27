import React from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";

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
    const displayContent = () => {
      if (this.state.route === "signin") {
        return <SignIn onRouteChange={this.onRouteChange}/>
      } else if (this.state.route === "register") {
        return <Register onRouteChange={this.onRouteChange} />
      } else if (this.state.route === "dashboard") {
        return <div></div>
      } 
    }

    const {route} = this.state; 

    return (
      <div>
        <Navigation route={route} onRouteChange={this.onRouteChange}/>
        {displayContent()}
      </div>
    );
  }
}

export default App;
