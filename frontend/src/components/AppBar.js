import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MaterialAppBar from '@material-ui/core/AppBar';
import {
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import { Inbox, Menu, Settings } from '@material-ui/icons';
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
  },
  listItemIcon: {
    marginLeft: theme.spacing(3)
  }
});

class AppBar extends Component {
  state = {
    drawerOpen: false
  };

  toggleDrawer = open => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    this.setState({ drawerOpen: open });
  };

  renderListItem(text, icon) {
    const { classes } = this.props;
    return (
      <ListItem button key={text}>
        <ListItemText primary={text} />
        <ListItemIcon className={classes.listItemIcon}>{icon}</ListItemIcon>
      </ListItem>
    );
  }

  renderList() {
    const { classes } = this.props;
    const listText = ['Settings', 'About'];
    const listIcons = [<Settings />];
    const listTextAndIcons = listText.map((text, i) => ({
      text: text,
      icon: listIcons[i]
    }));
    return (
      <div
        className={classes.list}
        role="presentation"
        onClick={this.toggleDrawer(false)}
        onKeyDown={this.toggleDrawer(false)}
      >
        <List>
          {listTextAndIcons.map(listItem =>
            this.renderListItem(listItem.text, listItem.icon)
          )}
        </List>
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Drawer open={this.state.drawerOpen} onClose={this.toggleDrawer(false)}>
          {this.renderList()}
        </Drawer>
        <MaterialAppBar position="static">
          <Toolbar>
            <IconButton
              onClick={this.toggleDrawer(true)}
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <Menu />
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
