import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Container, Card, CardContent, Typography } from '@material-ui/core';
import axios from 'axios';

const styles = theme => ({
  card: {
    boxShadow: '0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12)',
    margin: '2em'
  },
  songName: {
    fontWeight: '500'
  },
  media: {
    margin: '1em',
    height: 150,
    width: 150
  }
});

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
    console.log(songs);
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
    const artists = ['migos'];
    const daysBack = 180;
    const response = await axios.post('/api/songs', { artists });
    let songs = response.data;
    songs = this.filterCorrectArtists(songs, artists);
    songs = this.sortByReleaseDate(songs);
    songs = this.filterDuplicates(songs);
    const dateLimit = this.getPreviousDate(daysBack);
    songs = this.filterDateLimit(songs, dateLimit);
    return songs;
  }

  render() {
    const { classes } = this.props;
    return (
      <Container>
        {this.state.songs ? (
          this.state.songs.map((song, i) => (
            <Card className={classes.card} key={i}>
              <CardContent>
                <Typography className={classes.songName} variant="h5">
                  {song.name} by{' '}
                  {JSON.stringify(song.artists.map(artist => artist.name))}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>nothing :(</Card>
        )}
      </Container>
    );
  }
}

export default withStyles(styles)(Songs);
