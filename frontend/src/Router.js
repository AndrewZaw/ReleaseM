import React, { Component } from 'react';
import { AppBar, Footer } from './components';
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
import { withSnackbar } from 'notistack';
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

  displayLoginSnackbar = () =>
    this.props.enqueueSnackbar('Logged in successfully!', {
      variant: 'success'
    });

  login = token => {
    localStorage.setItem('auth-token', token);
    this.displayLoginSnackbar();
    this.setState({ loggedIn: this.isLoggedIn() });
  };

  displayLogoutSnackbar = () =>
    this.props.enqueueSnackbar('Logged out successfully!', {
      variant: 'error'
    });

  logout = () => {
    localStorage.setItem('auth-token', '');
    this.displayLogoutSnackbar();
    this.setState({ loggedIn: this.isLoggedIn() });
  };

  render() {
    return (
      <ReactRouter>
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
        <Footer />
      </ReactRouter>
    );
  }
}

export default withSnackbar(Router);
