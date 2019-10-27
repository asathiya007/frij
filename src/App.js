import React from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";

class App extends React.Component {
  constructor() {
    super(); 
    this.state = {
      route: "signin",
      token: ""
    }
  }

  componentDidMount() {
    fetch("https://frij-api.herokuapp.com/test"); 
  }

  onRouteChange = (route) => {
    this.setState({route});
  }

  onSaveToken = (token) => {
    this.setState({token});
  }

  render() {
    const displayContent = () => {
      if (this.state.route === "signin") {
        return <SignIn onRouteChange={this.onRouteChange} onSaveToken={this.onSaveToken}/>
      } else if (this.state.route === "register") {
        return <Register onRouteChange={this.onRouteChange} onSaveToken={this.onSaveToken}/>
      } else if (this.state.route === "dashboard") {
        return <Dashboard token={this.state.token}/>
      } 
    }

    const {route} = this.state; 

    return (
      <div>
        <Navigation route={route} onRouteChange={this.onRouteChange} onSaveToken={this.onSaveToken}/>
        {displayContent()}
      </div>
    );
  }
}

export default App;
