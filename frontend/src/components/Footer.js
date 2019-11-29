import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Typography, Link } from '@material-ui/core';

const styles = theme => ({
  footer: {
    marginTop: '70vh',
    padding: '1em'
  }
});

class Footer extends Component {
  renderCopyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://andrewzaw.github.io/">
          Andrew Zaw
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          ReleaseM
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Your Latest Music Tracker
        </Typography>
        {this.renderCopyright()}
      </footer>
    );
  }
}

export default withStyles(styles)(Footer);
