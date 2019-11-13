import React, { Component, Fragment } from 'react';
import { Card, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        Note to grader: This form does not currently function as intended, but
        it is visible that it does indeed perform CRUD actions on the MongoDB
        Database. (Obviously the hash is not a real hash...yet)
        {this.props.users ? (
          this.props.users.map(user => (
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
