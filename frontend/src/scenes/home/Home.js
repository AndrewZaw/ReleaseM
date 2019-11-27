import React, { Component } from 'react';
import { Container, Typography, Card, Button } from '@material-ui/core';
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
  }
});

class Home extends Component {
  state = {};

  render() {
    const { classes } = this.props;
    return (
      <Container>
        <Button color="inherit" component={Link} to="/artists">
          Artists
        </Button>
        <Button color="inherit" component={Link} to="/songs">
          Songs
        </Button>
      </Container>
    );
  }
}

export default withStyles(styles)(Home);
