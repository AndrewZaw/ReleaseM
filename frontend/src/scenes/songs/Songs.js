import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Container,
  Card,
  CardContent,
  Typography,
  CircularProgress
} from '@material-ui/core';
import SongCard from './containers/SongCard';
import SongForm from './containers/SongForm';
import axios from 'axios';

const styles = theme => ({
  text: {
    textAlign: 'center'
  },
  card: {
    boxShadow: '0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12)',
    margin: '2em',
    textAlign: 'center',
    padding: '1em'
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(5)
  }
});

class Songs extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    unfilteredSongs: [],
    songs: [],
    loading: false,
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
    this.setState({ daysBack });
    const dateLimit = this.getPreviousDate(daysBack);
    const songs = this.filterDateLimit(this.state.unfilteredSongs, dateLimit);
    this.setState({ songs });
  }

  async componentDidMount() {
    const { songs, unfilteredSongs } = await this.getSongs();
    this.setState({
      songs,
      unfilteredSongs
    });
    console.log(this.state.songs);
  }

  async getSongs() {
    this.setState({ loading: true });
    const response = await axios.post('/api/songs', {
      'auth-token': localStorage.getItem('auth-token')
    });
    let songs = response.data.songs;
    const artists = response.data.artists;
    songs = this.filterCorrectArtists(songs, artists);
    songs = this.sortByReleaseDate(songs);
    songs = this.filterDuplicates(songs);
    const dateLimit = this.getPreviousDate(this.state.daysBack);
    const unfilteredSongs = songs;
    songs = this.filterDateLimit(songs, dateLimit);
    this.setState({ loading: false });
    return { songs, unfilteredSongs };
  }

  renderSongs() {
    const { classes } = this.props;
    if (this.state.loading) {
      return (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      );
    }
    if (this.state.songs.length) {
      return this.state.songs.map((song, i) => (
        <SongCard
          key={i}
          songName={song.name}
          artists={song.artists}
          releaseDate={song.album.release_date}
          spotifyUrl={song.external_urls.spotify}
          albumName={song.album.name}
        />
      ));
    } else {
      return (
        <Card className={classes.card}>
          Could not find any recent songs :( Have you added any artists?
        </Card>
      );
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Container className={classes.root}>
        <SongForm handleSubmit={this.handleSubmit} />
        <Typography className={classes.text}>
          By default, only songs up to a month old (30 days) are shown. This can
          be adjusted with the form above.
        </Typography>
        {this.renderSongs()}
      </Container>
    );
  }
}

export default withStyles(styles)(Songs);
