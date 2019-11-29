import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';

const styles = theme => ({
  title: {
    marginBottom: '0.5em'
  }
});

class About extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Container className={classes.root}>
        <Typography variant="h1" className={classes.title}>
          About
        </Typography>
        <Typography>
          Designed in mind for those who love music, ReleaseM helps you keep up with the latest music releases from your favorite artists!
          Using the Spotify API, it allows you to organize, find and listen to new music from your favorite artists. It's as simple as
          creating an account and entering the names of artists you want to keep tabs on, we'll do the rest! <br /> <br />
          Created and designed by <a href="https://andrewzaw.github.io/">Andrew Zaw</a>
        </Typography>
      </Container>
    );
  }
}

export default withStyles(styles)(About);
