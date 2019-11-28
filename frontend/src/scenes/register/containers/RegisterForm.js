import React, { Component } from 'react';
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Typography
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap',
    margin: theme.spacing(3)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 280
  },
  button: {
    margin: theme.spacing(3),
    width: 100
  }
});

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
  }

  state = {
    email: '',
    username: '',
    password: '',
    showPassword: false,
    statusText: ''
  };

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    };
    try {
      await axios.post('/api/auth/register', { user });
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        this.setState({ statusText: error.response.statusText });
      }
    }
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

  fieldsValid() {
    return (
      this.state.username &&
      this.state.password &&
      this.state.email &&
      this.isUsernameValid() &&
      this.isPasswordValid() &&
      this.isEmailValid()
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.form} onSubmit={this.handleSubmit}>
        <TextField
          onChange={this.handleChange}
          id="username"
          name="username"
          className={classes.textField}
          label="Username"
          margin="normal"
          error={!this.isUsernameValid()}
          helperText="Username must be at least 5 characters long"
        />
        <TextField
          onChange={this.handleChange}
          id="email"
          name="email"
          className={classes.textField}
          label="Email"
          margin="normal"
          error={!this.isEmailValid()}
          helperText={
            this.isEmailValid() ? '' : 'Please enter a valid email address'
          }
        />
        <TextField
          onChange={this.handleChange}
          id="password"
          name="password"
          className={classes.textField}
          label="Password"
          type={this.state.showPassword ? 'text' : 'password'}
          margin="normal"
          error={!this.isPasswordValid()}
          helperText="Password must be at least 8 characters long"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={this.handleClickShowPassword}
                  onMouseDown={this.handleMouseDownPassword}
                >
                  {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <br />
        {this.fieldsValid() ? (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Submit
          </Button>
        ) : (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled
          >
            Submit
          </Button>
        )}
        {this.state.statusText ? (
          <Typography>{this.state.statusText}</Typography>
        ) : (
          ''
        )}
      </form>
    );
  }
}

export default withStyles(styles)(RegisterForm);
