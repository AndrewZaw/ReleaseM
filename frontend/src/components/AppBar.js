import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: 20
  },
  title: {
    flexGrow: 1
  }
}));

const AppBar = () => {
  const classes = useStyles();

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
          <Typography variant="h4" className={classes.title}>
            ReleaseM
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </MaterialAppBar>
    </div>
  );
};

export default AppBar;
