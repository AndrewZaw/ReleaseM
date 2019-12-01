import React, { Component } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
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

class LoginForm extends Component {
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

  renderRedirect() {
    return <Redirect to="/" />;
  }

  handleClickShowPassword() {
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  }

  handleMouseDownPassword(event) {
    event.preventDefault();
  }

  async handleSubmit(event) {
    event.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password
    };
    try {
      const response = await axios.post('/api/auth/login', { user });
      this.props.login(response.headers['auth-token']);
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        this.setState({ statusText: error.response.statusText });
      }
    }
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
        />
        <TextField
          onChange={this.handleChange}
          id="password"
          name="password"
          className={classes.textField}
          label="Password"
          type={this.state.showPassword ? 'text' : 'password'}
          margin="normal"
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
        {this.state.statusText ? (
          <Typography>{this.state.statusText}</Typography>
        ) : (
          <br />
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Login
        </Button>
        {this.props.loggedIn && this.renderRedirect()}
      </form>
    );
  }
}

export default withStyles(styles)(LoginForm);
