import React, { Component } from 'react';
import { Container, Typography } from '@material-ui/core';
import { LoginForm } from './containers';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import axios from 'axios';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  link: {
    fontWeight: '500',
    marginTop: theme.spacing(2)
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
        <Typography variant="body1" component={Link} className={classes.link} to="/register">
          Don't have an account? Register here!
        </Typography>
      </Container>
    );
  }
}

export default withStyles(styles)(Login);
