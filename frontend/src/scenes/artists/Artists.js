import React, { Component } from 'react';
import { Container, Card } from '@material-ui/core';
import ArtistForm from './containers/ArtistForm';
import ArtistCard from './containers/ArtistCard';
import YourArtists from './containers/YourArtists';
import ArtistSearch from './containers/ArtistSearch';
import axios from 'axios';

class Artists extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    artists: [],
    yourArtists: []
  };

  async componentDidMount() {
    const response = await axios.post('/api/artists/account', {
      'auth-token': localStorage.getItem('auth-token')
    });
    console.log(response.data);
    this.setState({ yourArtists: response.data });
  }

  handleSubmit(artists) {
    this.setState({ artists: artists });
  }

  render() {
    return (
      <Container>
        <YourArtists artists={this.state.yourArtists} />
        <ArtistForm handleSubmit={this.handleSubmit} />
        <ArtistSearch artists={this.state.artists} />
      </Container>
    );
  }
}

export default Artists;
