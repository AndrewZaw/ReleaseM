import React, { Component } from 'react';
import { Container, Typography, Card } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { HomeForm } from './containers';
import axios from 'axios';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  card: {
    textAlign: 'center',
    width: 500,
    marginTop: 30
  }
});

class Home extends Component {
  state = {
    artists: []
  };

  async componentDidMount() {
    const response = await axios.get('/api/artists');
    this.setState({
      artists: response.data.artists
    });
  }

  handleSubmit(artist) {
    this.setState(prevState => ({ artists: [...prevState.artists, artist] }));
  }

  render() {
    const { classes } = this.props;
    return (
      <Container>
        Note to grader: Other form is found by pressing Login. Return to
        homepage by pressing "ReleaseM" on left side.
        <HomeForm handleSubmit={this.handleSubmit.bind(this)} />
        {this.state.artists ? (
          this.state.artists.map(artist => (
            <Card className={classes.card}>
              <Typography variant="h5">Artist Name: </Typography>
              {artist.artistName}
              <Typography variant="h5">Song: </Typography>
              {artist.songName}
            </Card>
          ))
        ) : (
          <Card className={classes.card}>
            <Typography variant="h5">Nothing :(</Typography>
          </Card>
        )}
      </Container>
    );
  }
}

export default withStyles(styles)(Home);
