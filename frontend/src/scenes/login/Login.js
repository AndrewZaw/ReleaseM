import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import { LoginForm } from './containers';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

class Login extends Component {
  state = {
    users: []
  };

  async componentDidMount() {
    const response = await axios.get('/api/users');
    this.setState({
      users: response.data.users
    });
  }

  handleSubmit(user) {
    this.setState(prevState => ({ users: [...prevState.users, user] }));
  }

  render() {
    const { classes } = this.props;
    return (
      <Container className={classes.root}>
        <LoginForm handleSubmit={this.handleSubmit.bind(this)} />
      </Container>
    );
  }
}

export default withStyles(styles)(Login);
