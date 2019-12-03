import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';

const styles = theme => ({
  title: {
    marginBottom: '0.5em'
  }
});

class Settings extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Container className={classes.root}>
        <Typography variant="h2" className={classes.title}>
          Settings
        </Typography>
        <Typography>Coming soon!</Typography>
      </Container>
    );
  }
}

export default withStyles(styles)(Settings);
