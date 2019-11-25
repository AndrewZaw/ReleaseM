import React, { Component } from 'react';
import { Container, Card } from '@material-ui/core';
import axios from 'axios';

class Songs extends Component {
  state = {
    songs: []
  };

  async componentDidMount() {
    const songs = await this.getSongs();
    this.setState({
      songs: songs[0]
    });
    console.log(this.state.songs);
  }

  async getSongs() {
    const response = await axios.get('/api/songs');
    return response.data;
  }

  render() {
    return (
      <Container>
        {this.state.songs.map((song, i) => (
          <Card key={i}>
            {song.name} by{' '}
            {JSON.stringify(song.artists.map(artist => artist.name))}
          </Card>
        ))}
      </Container>
    );
  }
}

export default Songs;
