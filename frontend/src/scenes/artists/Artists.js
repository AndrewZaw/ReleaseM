import React, { Component } from 'react';
import { Container, Card } from '@material-ui/core';
import ArtistForm from './containers/ArtistForm';
import ArtistCard from './containers/ArtistCard';
import axios from 'axios';

class Artists extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    artists: []
  };

  handleSubmit(artists) {
    this.setState({ artists: artists });
  }

  render() {
    return (
      <Container>
        <ArtistForm handleSubmit={this.handleSubmit} />
        {this.state.artists ? (
          this.state.artists.map((artist, i) => {
            return (
              <ArtistCard
                key={i}
                name={artist.name}
                img={artist.images[0] ? artist.images[0].url : ''}
                profileUrl={artist.external_urls.spotify}
                monthlyListeners={artist.followers.total.toLocaleString()}
              />
            );
          })
        ) : (
          <Card>nothing :(</Card>
        )}
      </Container>
    );
  }
}

export default Artists;
