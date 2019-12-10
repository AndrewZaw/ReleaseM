import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Divider, Typography } from '@material-ui/core';
import { ArrowRight } from '@material-ui/icons';

const styles = theme => ({
  root: {},
  setting: {
    fontWeight: '400',
    padding: '1em'
  },
  settingSubtext: {
    fontWeight: '400',
    color: '#777'
  },
  arrowRight: {
    float: 'right'
  }
});

class SettingsPaper extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Typography className={classes.setting}>
          Connect your Spotify Account
          <Typography className={classes.settingSubtext}>Test</Typography>
        </Typography>
        <Divider />
        <Typography className={classes.setting}>
          Manage your account
          <ArrowRight className={classes.arrowRight} />
        </Typography>
      </Paper>
    );
  }
}

export default withStyles(styles)(SettingsPaper);
