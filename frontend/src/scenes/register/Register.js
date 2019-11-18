import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import RegisterForm from './containers/RegisterForm';

class Register extends Component {
  render() {
    return (
      <Container>
        <RegisterForm />
      </Container>
    );
  }
}

export default Register;
