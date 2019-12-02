import React, { Component } from 'react';
import { Container, Card } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ArtistCard from './ArtistCard';
import axios from 'axios';

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap',
    margin: theme.spacing(3)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 280
  },
  button: {
    margin: theme.spacing(3),
    width: 100
  }
});

class YourArtists extends Component {
  constructor(props) {
    super(props);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { classes } = this.props;
    return (
      <Container>
        {this.props.artists.length ? (
          this.props.artists.map((artist, i) => {
            return (
              <ArtistCard
                removeArtist={this.props.removeArtist}
                key={i}
                id={artist.id}
                name={artist.name}
                img={artist.images[0] ? artist.images[0].url : ''}
                profileUrl={artist.external_urls.spotify}
                yourArtists={true}
                monthlyListeners={artist.followers.total.toLocaleString()}
              />
            );
          })
        ) : (
          <Card>You have no artists currently :(</Card>
        )}
      </Container>
    );
  }
}

export default withStyles(styles)(YourArtists);
