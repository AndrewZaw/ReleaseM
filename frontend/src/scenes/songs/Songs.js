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
      songs: songs
    });
  }

  async getSongs() {
    const response = await axios.get('/api/songs');
    console.log(response.data);
    return response.data;
  }

  render() {
    return (
      <Container>
        {this.state.songs.map(song => (
          <Card>{song.name} by</Card>
        ))}
      </Container>
    );
  }
}

export default Songs;
