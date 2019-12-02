import React, { Component, Fragment } from 'react';
import { Container, Card, Paper, Tabs, Tab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ArtistForm from './containers/ArtistForm';
import YourArtists from './containers/YourArtists';
import ArtistSearch from './containers/ArtistSearch';
import axios from 'axios';

const styles = theme => ({
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
    tab: 0
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

  addArtist = async artistName => {
    const response = await axios.post('/api/artists/add', {
      artist: artistName,
      'auth-token': localStorage.getItem('auth-token')
    });
    this.updateArtists();
    // this.setState(prevState => ({artists: prevState.artists.filter(element => element !== artist),yourArtists: prevState.yourArtists.push(artist)}))
  };

  removeArtist = async artistName => {
    const response = await axios.post('/api/artists/remove', {
      artist: artistName,
      'auth-token': localStorage.getItem('auth-token')
    });
    this.updateArtists();
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
          <Tab label="Add an Artist" />
          <Tab label="Your Artists" />
        </Tabs>
        {this.state.tab ? (
          <YourArtists
            removeArtist={this.removeArtist}
            artists={this.state.yourArtists}
          />
        ) : (
          <Fragment>
            <ArtistForm handleSubmit={this.handleSubmit} />
            <ArtistSearch
              addArtist={this.addArtist}
              artists={this.state.artists}
            />
          </Fragment>
        )}
      </Container>
    );
  }
}

export default withStyles(styles)(Artists);
