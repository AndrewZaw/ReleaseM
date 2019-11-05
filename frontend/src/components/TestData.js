import React, { Component, Fragment } from 'react';
import { Card } from '@material-ui/core';
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
    minWidth: 100
  }
});

class TestData extends Component {
  state = {
    data: []
  };

  async componentDidMount() {
    const response = await axios.get('/api/users');
    this.setState({ data: response.data });
  }

  render() {
    return <div className="container">{<Card>{this.data}</Card>}</div>;
  }
}

export default withStyles(styles)(TestData);
