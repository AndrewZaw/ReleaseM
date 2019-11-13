import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MaterialAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Login from '../scenes/login/Login';
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: 20
  },
  title: {
    textDecoration: 'none',
    color: '#fff',
    flexGrow: 1
  }
});

class AppBar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
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
            <Typography
              component={Link}
              to="/"
              variant="h4"
              className={classes.title}
            >
              ReleaseM
            </Typography>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          </Toolbar>
        </MaterialAppBar>
      </div>
    );
  }
}

export default withStyles(styles)(AppBar);
