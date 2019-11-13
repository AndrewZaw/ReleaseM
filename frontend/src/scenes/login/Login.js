import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import { LoginForm, TestData } from './containers';

class Login extends Component {
  render() {
    return (
      <Container>
        <LoginForm />
        <TestData />
      </Container>
    );
  }
}

export default Login;
