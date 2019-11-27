import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Container, Card, CardContent, Typography } from '@material-ui/core';
import SongCard from './containers/SongCard';
import SongForm from './containers/SongForm';
import axios from 'axios';

const styles = theme => ({
  text: {
    textAlign: 'center'
  }
});

class Songs extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    songs: [],
    daysBack: 30
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

  handleSubmit(daysBack) {
    this.setState({ daysBack: daysBack });
  }

  async componentDidMount() {
    const songs = await this.getSongs();
    this.setState({
      songs: songs
    });
    console.log(this.state.songs);
  }

  async componentDidUpdate() {
    const songs = await this.getSongs();
    this.setState({
      songs: songs
    });
    console.log(this.state.songs);
  }

  async getSongs() {
    const artists = ['drake', 'migos'];
    const response = await axios.post('/api/songs', { artists });
    let songs = response.data;
    songs = this.filterCorrectArtists(songs, artists);
    songs = this.sortByReleaseDate(songs);
    songs = this.filterDuplicates(songs);
    const dateLimit = this.getPreviousDate(this.state.daysBack);
    songs = this.filterDateLimit(songs, dateLimit);
    return songs;
  }

  render() {
    const { classes } = this.props;
    return (
      <Container className={classes.root}>
        <SongForm handleSubmit={this.handleSubmit} />
        <Typography className={classes.text}>
          By default, only songs up to a month old are shown. This can be
          adjusted with the form above.
        </Typography>
        {this.state.songs ? (
          this.state.songs.map((song, i) => (
            <SongCard
              key={i}
              songName={song.name}
              artists={song.artists}
              releaseDate={song.album.release_date}
              spotifyUrl={song.external_urls.spotify}
              albumName={song.album.name}
            />
          ))
        ) : (
          <Card>nothing :(</Card>
        )}
      </Container>
    );
  }
}

export default withStyles(styles)(Songs);
