import React, { Component } from 'react';
import { Container, TextField, Button, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

const styles = theme => ({
  form: {
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

class LoginForm extends Component {
  state = {
    email: '',
    username: '',
    password: '',
    showPassword: false
  };

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  // TODO: change this
  async handleSubmit(event) {
    event.preventDefault();
    const user = {
      username: this.state.username,
      hash: this.state.password
    };
    await axios.post('/api/users/add', { user });
    await this.props.handleSubmit(user);
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
      <Container className={classes.container}>
        <form className={classes.form} onSubmit={this.handleSubmit.bind(this)}>
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
            id="email"
            name="email"
            className={classes.textField}
            label="Email"
            margin="normal"
          />
          <TextField
            onChange={this.handleChange.bind(this)}
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
      </Container>
    );
  }
}

export default withStyles(styles)(LoginForm);
