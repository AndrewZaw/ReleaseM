import React, { Component, Fragment } from 'react';
import { TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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
  render() {
    const { classes } = this.props;
    return (
      <form className={classes.container}>
        <TextField
          id="username"
          className={classes.textField}
          label="Username"
          margin="normal"
        />
        <TextField
          id="password"
          className={classes.textField}
          label="Password"
          type="password"
          margin="normal"
        />
        <br />
        <Button variant="contained" color="primary" className={classes.button}>
          Submit
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(LoginForm);
