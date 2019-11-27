import React, { Component } from 'react';
import {
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  CardMedia
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

const styles = theme => ({
  card: {
    boxShadow: '0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12)',
    margin: '2em'
  },
  artistName: {
    fontWeight: '300'
  },
  buttonArea: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  button: {
    margin: '0.5em'
  },
  media: {
    margin: '1em',
    height: 150,
    width: 150
  }
});

class SongCard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card} key={this.props.key}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item xs={5}>
            <CardContent>
              <Typography className={classes.songName} variant="h5">
                {this.props.songName}
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={2}>
            <CardContent>
              <Typography className={classes.artistNames}>
                {this.props.releaseDate}
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={2}>
            <CardContent>
              <Typography>{this.props.albumName}</Typography>
            </CardContent>
          </Grid>
          <Grid item xs={3}>
            <CardContent>
              {this.props.artists.map((artist, i) => (
                <Typography
                  key={i}
                  className={classes.artistNames}
                  variant="h6"
                >
                  {artist.name}
                </Typography>
              ))}
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    );
  }
}

export default withStyles(styles)(SongCard);
