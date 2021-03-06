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
  ListItemText,
  Tooltip
} from '@material-ui/core';
import {
  Home,
  Menu,
  Settings,
  Info,
  Help,
  MusicNote,
  Album
} from '@material-ui/icons';
import { Redirect, Link } from 'react-router-dom';
import GithubIcon from './GithubIcon';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: '3em'
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
    minWidth: 40
  },
  list: {
    width: 225
  },
  githubButton: {
    marginRight: '1em'
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

  renderListItem(text, icon, link) {
    const { classes } = this.props;
    return (
      <ListItem button key={text} component={Link} to={link}>
        <ListItemText primary={text} />
        <ListItemIcon className={classes.listItemIcon}>{icon}</ListItemIcon>
      </ListItem>
    );
  }

  renderListLoggedIn() {
    const listText = [
      'Home',
      'How to Use',
      'Your Songs',
      'Your Artists',
      'Settings',
      'About'
    ];
    const listIcons = [
      <Home />,
      <Help />,
      <MusicNote />,
      <Album />,
      <Settings />,
      <Info />
    ];
    const listLinks = [
      '/',
      '/help',
      '/songs',
      '/artists',
      '/settings',
      '/about'
    ];
    const list = listText.map((text, i) => ({
      text: text,
      icon: listIcons[i],
      link: listLinks[i]
    }));

    return this.renderListFromInfo(list);
  }

  renderListNotLoggedIn() {
    const listText = ['Home', 'How to Use', 'About'];
    const listIcons = [<Home />, <Help />, <Info />];
    const listLinks = ['/', '/help', '/about'];
    const list = listText.map((text, i) => ({
      text: text,
      icon: listIcons[i],
      link: listLinks[i]
    }));
    return this.renderListFromInfo(list);
  }

  renderListFromInfo(list) {
    const { classes } = this.props;
    return (
      <div
        className={classes.list}
        role="presentation"
        onClick={this.toggleDrawer(false)}
        onKeyDown={this.toggleDrawer(false)}
      >
        <List>
          {list.map(listItem =>
            this.renderListItem(listItem.text, listItem.icon, listItem.link)
          )}
        </List>
      </div>
    );
  }

  renderRedirect() {
    return <Redirect to="/login" />;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Drawer open={this.state.drawerOpen} onClose={this.toggleDrawer(false)}>
          {this.props.loggedIn
            ? this.renderListLoggedIn()
            : this.renderListNotLoggedIn()}
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
            <Tooltip
              title="Github Repository"
              placement="bottom"
              leaveDelay={300}
            >
              <IconButton
                className={classes.githubButton}
                color="inherit"
                aria-label="Github Repository"
                onClick={() =>
                  window.open('https://github.com/AndrewZaw/ReleaseM', '_blank')
                }
              >
                <GithubIcon />
              </IconButton>
            </Tooltip>
            {this.props.loggedIn ? (
              <div>
                <Button color="inherit" onClick={this.props.logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            )}
          </Toolbar>
        </MaterialAppBar>
      </div>
    );
  }
}

export default withStyles(styles)(AppBar);
