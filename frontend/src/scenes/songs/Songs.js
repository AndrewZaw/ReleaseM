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

  filterCorrectArtists = (songs, artists) => {
    return songs.filter(song =>
      song.artists.some(artist => artists.includes(artist.name.toLowerCase()))
    );
  };

  filterDateLimit = (songs, dateLimit) =>
    songs.filter(song => song.album.release_date > dateLimit);

  sortByReleaseDate = songs =>
    songs.sort((songOne, songTwo) =>
      songOne.album.release_date < songTwo.album.release_date ? 1 : -1
    );

  isSongInArray = (array, songName) =>
    array.find(song => song.name === songName);

  filterDuplicates = songs => {
    songs = songs.reverse();
    songs = songs.reduce((duplicatesRemoved, song) => {
      if (!this.isSongInArray(duplicatesRemoved, song.name)) {
        duplicatesRemoved.push(song);
      }
      return duplicatesRemoved;
    }, []);
    return songs.reverse();
  };

  async componentDidMount() {
    const songs = await this.getSongs();
    this.setState({
      songs: songs
    });
    console.log(this.state.songs);
  }

  async getSongs() {
    const artists = ['drake', 'migos'];
    const daysBack = 90;
    const response = await axios.post('/api/songs', { artists });
    let songs = response.data;
    songs = this.filterCorrectArtists(songs, artists);
    songs = this.filterDuplicates(songs);
    const dateLimit = this.getPreviousDate(daysBack);
    songs = this.filterDateLimit(songs, dateLimit);
    songs = this.sortByReleaseDate(songs);
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
