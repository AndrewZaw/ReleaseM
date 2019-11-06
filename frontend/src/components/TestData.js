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
    textAlign: 'center',
    width: 500
  }
});

class TestData extends Component {
  state = {
    users: []
  };

  async componentDidMount() {
    const response = await axios.get('/api/users');
    this.setState({
      users: response.data.users
    });
  }

  render() {
    return (
      <div>
        {this.state.users.map(user => (
          <Card className="card">
            Username: {user.username} Hash: {user.hash}
          </Card>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(TestData);
