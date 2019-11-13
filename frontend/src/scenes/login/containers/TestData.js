import React, { Component, Fragment } from 'react';
import { Card, Typography } from '@material-ui/core';
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
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        Note to grader: This form does not currently function as intended, but
        it is visible that it does indeed perform CRUD actions on the MongoDB
        Database. (Obviously the hash is not a real hash...yet) Does not
        currently auto-update on state change (Refresh needed)
        {this.state.users ? (
          this.state.users.map(user => (
            <Card className={classes.card}>
              <Typography variant="h5">Username: </Typography>
              {user.username}
              <Typography variant="h5">Hash: </Typography>
              {user.hash}
            </Card>
          ))
        ) : (
          <Card className={classes.card}>
            <Typography variant="h5">Nothing :(</Typography>
          </Card>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(TestData);
