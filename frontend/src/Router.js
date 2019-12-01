import React, { Component } from 'react';
import { AppBar, Footer } from './components';
import {
  Home,
  Login,
  Register,
  Songs,
  Artists,
  About,
  Settings
} from './scenes';
import { Button } from '@material-ui/core';
import { BrowserRouter as ReactRouter, Switch, Route } from 'react-router-dom';
import { PropsRoute } from './components';

class Router extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    loggedIn: this.isLoggedIn()
  };

  isLoggedIn() {
    return !!localStorage.getItem('auth-token');
  }

  login = token => {
    localStorage.setItem('auth-token', token);
    this.setState({ loggedIn: this.isLoggedIn() });
  };

  logout = () => {
    localStorage.setItem('auth-token', '');
    this.setState({ loggedIn: this.isLoggedIn() });
  };

  render() {
    return (
      <ReactRouter>
        <div className="App">
          <AppBar loggedIn={this.state.loggedIn} logout={this.logout} />
          <Switch>
            <Route exact path="/" component={Home} />
            <PropsRoute
              path="/login"
              login={this.login}
              loggedIn={this.state.loggedIn}
              component={Login}
            />
            <Route path="/register" component={Register} />
            <Route path="/songs" component={Songs} />
            <Route path="/artists" component={Artists} />
            <Route path="/settings" component={Settings} />
            <Route path="/about" component={About} />
          </Switch>
          <Footer />
        </div>
      </ReactRouter>
    );
  }
}

export default Router;
