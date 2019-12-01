import React, { Component } from 'react';
import { AppBar, Footer, Snackbar } from './components';
import {
  Home,
  Login,
  Register,
  Songs,
  Artists,
  About,
  Settings,
  Help
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

  setSnackbarType() {
    if (this.state.loggedIn) {
      return 'login';
    } else if (!this.state.loggedIn) {
      return 'logout';
    }
    return;
  }

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
            <Route path="/help" component={Help} />
          </Switch>
          <Snackbar snackbarType={this.setSnackbarType()} />
          <Footer />
        </div>
      </ReactRouter>
    );
  }
}

export default Router;
