import React, { Component } from 'react';
import { Container, Typography, Card } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
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
  }
});

class Home extends Component {
  state = {};

  render() {
    const { classes } = this.props;
    return <Container>Homepage</Container>;
  }
}

export default withStyles(styles)(Home);
