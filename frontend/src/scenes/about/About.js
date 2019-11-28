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
        <Typography>ReleaseM is an application designed to allow you to keep track of your favorite artists! Made by Andrew Zaw</Typography>
      </Container>
    );
  }
}

export default withStyles(styles)(About);
