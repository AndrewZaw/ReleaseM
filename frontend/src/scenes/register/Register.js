import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import RegisterForm from './containers/RegisterForm';
import { Link } from 'react-router-dom';

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
