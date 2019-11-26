import React, { Component } from 'react';
import { Container, Card } from '@material-ui/core';
import axios from 'axios';

class Songs extends Component {
  state = {
    songs: []
  };

  getPreviousDate = days => {
    const today = new Date();
    const returnDate = new Date(new Date().setDate(today.getDate() - days))
      .toISOString()
      .slice(0, 10);
    return returnDate;
  };

  async componentDidMount() {
    const songs = await this.getSongs();
    this.setState({
      songs: songs
    });
    console.log(this.state.songs);
  }

  async getSongs() {
    const artists = ['illenium', 'drake'];
    const response = await axios.post('/api/songs', { artists });
    let songs = response.data;
    console.log(songs)
    const dateLimit = this.getPreviousDate(30);
    songs = songs.filter(song => {
      return song.album.release_date > dateLimit;
    });
    songs.sort((songOne, songTwo) => {
      return songOne.album.release_date < songTwo.album.release_date ? 1 : -1;
    });
    return songs;
  }

  render() {
    return (
      <Container>
        {this.state.songs ? (
          this.state.songs.map((song, i) => (
            <Card key={i}>
              {song.name} by{' '}
              {JSON.stringify(song.artists.map(artist => artist.name))}
            </Card>
          ))
        ) : (
          <Card>nothing :(</Card>
        )}
      </Container>
    );
  }
}

export default Songs;
