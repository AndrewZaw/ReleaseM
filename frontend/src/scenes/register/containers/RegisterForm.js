import React, { Component } from 'react';
import { TextField, Button, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
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
    width: 280
  },
  button: {
    margin: theme.spacing(1),
    width: 100
  }
});

class RegisterForm extends Component {
  state = {
    email: '',
    username: '',
    password: '',
    showPassword: false
  };

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const user = {
      username: this.state.username,
      hash: this.state.password
    };
    await axios.post('/api/users/add', { user });
    await this.props.handleSubmit(user);
  }

  isEmailValid() {
    const email = this.state.email;
    const validEmail = /\S+@\S+\.\S+/;
    return email.length < 1 || validEmail.test(email);
  }

  isUsernameValid() {
    const username = this.state.username;
    const minimumUsernameLength = 5;
    return username.length === 0 || username.length >= minimumUsernameLength;
  }

  isPasswordValid() {
    const password = this.state.password;
    const minimumPasswordLength = 8;
    return password.length === 0 || password.length >= minimumPasswordLength;
  }

  handleClickShowPassword() {
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  }

  handleMouseDownPassword(event) {
    event.preventDefault();
  }

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.container} onSubmit={this.handleSubmit.bind(this)}>
        <TextField
          onChange={this.handleChange.bind(this)}
          id="username"
          name="username"
          className={classes.textField}
          label="Username"
          margin="normal"
          error={!this.isUsernameValid()}
          helperText={this.isUsernameValid() ? '' : 'Username must be at least 5 characters long'}
        />
        <TextField
          onChange={this.handleChange.bind(this)}
          id="email"
          name="email"
          className={classes.textField}
          label="Email"
          margin="normal"
          error={!this.isEmailValid()}
          helperText={this.isEmailValid() ? '' : 'Please enter a valid email address'}
        />
        <TextField
          onChange={this.handleChange.bind(this)}
          id="password"
          name="password"
          className={classes.textField}
          label="Password"
          type={this.state.showPassword ? 'text' : 'password'}
          margin="normal"
          error={!this.isPasswordValid()}
          helperText={this.isPasswordValid() ? '' : 'Password must be at least 8 characters long'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={this.handleClickShowPassword.bind(this)}
                  onMouseDown={this.handleMouseDownPassword.bind(this)}
                >
                  {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <br />
        <Button type="submit" variant="contained" color="primary" className={classes.button}>
          Submit
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(RegisterForm);
