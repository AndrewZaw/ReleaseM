import React, { Component, Fragment } from 'react';
import { TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  button: {
    margin: theme.spacing(1),
    width: 100
  }
});

class LoginForm extends Component {
  state = {
    username: '',
    password: ''
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const user = {
      username: this.state.username,
      hash: this.state.password
    };
    const response = await axios.post('/api/users/add', { user });
  };

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.container} onSubmit={this.handleSubmit}>
        <TextField
          onChange={this.handleChange.bind(this)}
          id="username"
          name="username"
          className={classes.textField}
          label="Username"
          margin="normal"
        />
        <TextField
          onChange={this.handleChange.bind(this)}
          id="password"
          name="password"
          className={classes.textField}
          label="Password"
          type="password"
          margin="normal"
        />
        <br />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Submit
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(LoginForm);
