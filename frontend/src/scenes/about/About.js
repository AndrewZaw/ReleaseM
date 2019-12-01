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
          About ReleaseM
        </Typography>
        <Typography>
          Designed in mind for those who love music, ReleaseM helps you keep up
          with the latest music releases from your favorite artists! Using the
          Spotify API, it allows you to organize, find and listen to new music
          from your favorite artists. It's as simple as creating an account and
          entering the names of artists you want to keep tabs on, we'll do the
          rest! <br /> <br />
          This app is a personal project created and designed by me, Andrew Zaw.
          I always love to hear new songs from the artists I listen to, but I
          consistently found it difficult to find them. I would have to go to
          each of their pages and look at their discography, scour through
          playlists of new releases, or browse forums or Reddit to find them.
          Even then, I would undoubtedly miss quite a few songs doing this. So I
          created ReleaseM! Check out my website{' '}
          <a href="https://andrewzaw.github.io/">here!</a>
        </Typography>
      </Container>
    );
  }
}

export default withStyles(styles)(About);
