import React, { Component } from 'react';
import { Container, Typography, Grid, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const styles = theme => ({
  title: {
    marginBottom: '0.5em'
  }
});

class Help extends Component {
  state = {};

  render() {
    const { classes } = this.props;
    return (
      <Container>
        <Typography variant="h2" className={classes.title}>
          How to Use
        </Typography>
        <Typography>
          <ol>
            <li>
              <Typography to="/register" component={Link}>
                Register
              </Typography>{' '}
              an account with us
            </li>
            <li>
              <Typography to="/artists" component={Link}>
                Login
              </Typography>{' '}
              to your newly made account!
            </li>
            <li>
              <Typography to="/artists" component={Link}>
                Add the artists
              </Typography>{' '}
              you would like to follow
            </li>
            <li>
              <Typography to="/songs" component={Link}>
                View your songs
              </Typography>{' '}
              and that's it! The most recently released songs from the artists
              you have chosen should be visible!
            </li>
          </ol>
          Using ReleaseM is simple! View the Github README{' '}
          <a href="https://github.com/AndrewZaw/ReleaseM/blob/master/README.md">
            here!
          </a>
        </Typography>
      </Container>
    );
  }
}

export default withStyles(styles)(Help);
