import React, { Component, Fragment } from 'react';
import {
  Container,
  Card,
  Paper,
  Tabs,
  Tab,
  Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ArtistForm from './containers/ArtistForm';
import YourArtists from './containers/YourArtists';
import ArtistSearch from './containers/ArtistSearch';
import { withSnackbar } from 'notistack';
import axios from 'axios';

const styles = theme => ({
  card: {
    boxShadow: '0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12)',
    margin: '2em',
    textAlign: 'center',
    padding: '1em'
  },
  root: {
    flexGrow: 1
  }
});

class Artists extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    artists: [],
    yourArtists: [],
    tab: 1
  };

  componentDidMount = () => {
    this.updateArtists();
  };

  async getArtists() {
    const response = await axios.post('/api/artists/account', {
      'auth-token': localStorage.getItem('auth-token')
    });
    return response.data;
  }

  updateArtists = async () => {
    const artists = await this.getArtists();
    this.setState({ yourArtists: artists });
  };

  displayAddArtistSnackbar = artist =>
    this.props.enqueueSnackbar(`Added ${artist} to your artists.`, {
      variant: 'success'
    });

  displayArtistAlreadyAddedSnackbar = artist =>
    this.props.enqueueSnackbar(`${artist} is already in your artists!`, {
      variant: 'warning'
    });

  addArtist = async artistName => {
    try {
      const response = await axios.post('/api/artists/add', {
        artist: artistName,
        'auth-token': localStorage.getItem('auth-token')
      });
      const artist = response.data;
      this.displayAddArtistSnackbar(artist);
      this.updateArtists();
    } catch (err) {
      if (err.response.status === 409) {
        console.log(err.response.data);
        this.displayArtistAlreadyAddedSnackbar(err.response.data);
      }
    }
  };

  displayRemoveArtistSnackbar = artist =>
    this.props.enqueueSnackbar(`Removed ${artist} from your artists.`, {
      variant: 'error'
    });

  removeArtist = async artistName => {
    const response = await axios.post('/api/artists/remove', {
      artist: artistName,
      'auth-token': localStorage.getItem('auth-token')
    });
    const artist = response.data;
    this.displayRemoveArtistSnackbar(artist);
    this.updateArtists();
  };

  renderTabs = tabNumber => {
    const { classes } = this.props;
    switch (tabNumber) {
      case 0:
        return (
          <Card className={classes.card}>
            <Typography>Coming soon!</Typography>
          </Card>
        );
      case 1:
        return (
          <Fragment>
            <ArtistForm handleSubmit={this.handleSubmit} />
            <ArtistSearch
              addArtist={this.addArtist}
              artists={this.state.artists}
            />
          </Fragment>
        );
      case 2:
        return (
          <YourArtists
            handleAddButton={this.handleChange}
            removeArtist={this.removeArtist}
            artists={this.state.yourArtists}
          />
        );
    }
  };

  handleSubmit(artists) {
    this.setState({ artists: artists });
  }

  handleChange = (event, value) => {
    this.setState({ tab: value });
  };

  render() {
    const { classes } = this.props;
    return (
      <Container>
        <Tabs
          value={this.state.tab}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Suggested Artists" />
          <Tab label="Add an Artist" />
          <Tab label="Your Artists" />
        </Tabs>
        {this.renderTabs(this.state.tab)}
      </Container>
    );
  }
}

export default withStyles(styles)(withSnackbar(Artists));
