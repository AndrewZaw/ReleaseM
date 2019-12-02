import React, { Component } from 'react';
import { Container, Card, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ArtistCard from './ArtistCard';

const styles = theme => ({
  card: {
    boxShadow: '0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12)',
    margin: '2em',
    textAlign: 'center',
    padding: '1em'
  }
});

class YourArtists extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <Container>
        {this.props.artists.length ? (
          this.props.artists.map((artist, i) => {
            return (
              <ArtistCard
                addArtist={this.props.addArtist}
                key={i}
                id={artist.id}
                name={artist.name}
                img={artist.images[0] ? artist.images[0].url : ''}
                profileUrl={artist.external_urls.spotify}
                monthlyListeners={artist.followers.total.toLocaleString()}
              />
            );
          })
        ) : (
          <Card className={classes.card}>
            <Typography>No artists found, start searching for one!</Typography>
          </Card>
        )}
      </Container>
    );
  }
}

export default withStyles(styles)(YourArtists);
