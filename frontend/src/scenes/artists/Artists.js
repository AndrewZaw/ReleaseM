import React, { Component } from 'react';
import { Container, Card } from '@material-ui/core';
import ArtistForm from './containers/ArtistForm';
import axios from 'axios';

class Artists extends Component {
  state = {
    artists: []
  };

  async componentDidMount() {}

  render() {
    return (
      <Container>
        <ArtistForm />
        {this.state.artists ? (
          this.state.artists.map((artist, i) => (
            <Card key={i}>{artist.name}</Card>
          ))
        ) : (
          <Card>nothing :(</Card>
        )}
      </Container>
    );
  }
}

export default Artists;
