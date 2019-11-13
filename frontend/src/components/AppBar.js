import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MaterialAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Login from '../scenes/login/Login';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: 20
  },
  title: {
    flexGrow: 1
  }
});

class AppBar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Router>
          <MaterialAppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h4" className={classes.title}>
                ReleaseM
              </Typography>
              <Route>
                <Button color="inherit" to="/">
                  Login
                </Button>
              </Route>
            </Toolbar>
          </MaterialAppBar>
        </Router>
      </div>
    );
  }
}

export default withStyles(styles)(AppBar);
