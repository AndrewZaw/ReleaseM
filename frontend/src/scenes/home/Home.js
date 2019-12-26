import React, { Component } from 'react';
import { Container, Typography, Grid, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import axios from 'axios';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  card: {
    textAlign: 'center',
    width: 500,
    marginTop: 30
  },
  heroContent: {
    padding: theme.spacing(6)
  },
  heroButtons: {
    marginTop: theme.spacing(6)
  }
});

class Home extends Component {
  state = {};

  renderIntro() {
    const { classes } = this.props;
    if (!this.props.loggedIn) {
      return (
        <div className={classes.heroButtons}>
          <Grid container spacing={4} justify="center">
            <Grid item>
              <Button variant="contained" size="large" color="primary" component={Link} to="/register">
                Register
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" size="large" color="primary" component={Link} to="/login">
                Login
              </Button>
            </Grid>
          </Grid>
        </div>
      );
    } else {
      return (
        <div className={classes.heroButtons}>
          <Grid container justify="center">
            <Grid item>
              <Button variant="outlined" size="large" color="primary" component={Link} to="/help">
                How to Use
              </Button>
            </Grid>
          </Grid>
        </div>
      );
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h1" align="center" color="textPrimary" gutterBottom>
            ReleaseM
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Welcome to ReleaseM, the music app designed with you in mind. Tracking the latest releases from all your favorite artists has
            never been easier!
          </Typography>
          {this.renderIntro()}
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
