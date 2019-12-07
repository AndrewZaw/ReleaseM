import React, { Component } from 'react';
import {
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  CardMedia,
  IconButton,
  Tooltip
} from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { SpotifyIcon } from '../../../components';
import axios from 'axios';

const styles = theme => ({
  card: {
    boxShadow: '0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12)',
    margin: '1em'
  },
  artistName: {
    marginLeft: '1em',
    fontWeight: '400'
  },
  media: {
    margin: '0em',
    height: 100,
    width: 100
  },
  buttonArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: '0.5em'
  },
  button: {
    padding: '6px'
  },
  spotifyButton: {
    color: '#1db954'
  }
});

class ArtistCard extends Component {
  constructor() {
    super();
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item xs={1}>
            <CardMedia
              className={classes.media}
              image={this.props.img}
              title={this.props.name}
            />
          </Grid>
          <Grid item xs={5}>
            <CardContent>
              <Typography className={classes.artistName} variant="h5">
                {this.props.name}
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={3}>
            <CardContent>
              <Typography color="textSecondary">
                {this.props.monthlyListeners} monthly listeners
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={3}>
            <CardActions className={classes.buttonArea}>
              <Tooltip enterDelay={500} title="See Profile">
                <IconButton
                  className={`${classes.spotifyButton} ${classes.button}`}
                  color="default"
                  aria-label="See Profile on Spotify"
                  target="_blank"
                  href={this.props.profileUrl}
                >
                  <SpotifyIcon />
                </IconButton>
              </Tooltip>
              {this.props.yourArtists ? (
                <Tooltip enterDelay={500} title="Remove">
                  <IconButton
                    onClick={() => this.props.removeArtist(this.props.name)}
                    aria-label="delete"
                    className={classes.button}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip enterDelay={500} title="Add">
                  <IconButton
                    onClick={() => this.props.addArtist(this.props.name)}
                    aria-label="add"
                    className={classes.button}
                  >
                    <Add />
                  </IconButton>
                </Tooltip>
              )}
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    );
  }
}

export default withStyles(styles)(ArtistCard);
