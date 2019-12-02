import React, { Component } from 'react';
import { Container, Card } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ArtistCard from './ArtistCard';

const styles = theme => ({});

class YourArtists extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <Container>
        {this.props.artists ? (
          this.props.artists.map((artist, i) => {
            return (
              <ArtistCard
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
          <Card>No Artists found :((</Card>
        )}
      </Container>
    );
  }
}

export default withStyles(styles)(YourArtists);
