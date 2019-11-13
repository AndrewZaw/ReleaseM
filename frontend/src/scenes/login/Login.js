import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import { LoginForm, TestData } from './containers';
import axios from 'axios';

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
    return (
      <Container>
        <LoginForm handleSubmit={this.handleSubmit.bind(this)} />
        <TestData users={this.state.users} />
      </Container>
    );
  }
}

export default Login;
