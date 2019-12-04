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
  IconButton
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

const styles = theme => ({
  card: {
    boxShadow: '0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12)',
    margin: '1em'
  },
  artistName: {
    marginLeft: '1em',
    fontWeight: '500'
  },
  buttonArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  button: {
    margin: '0.2em'
  },
  media: {
    margin: '0em',
    height: 100,
    width: 100
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
              <Button
                color="primary"
                className={classes.button}
                target="_blank"
                href={this.props.profileUrl}
              >
                See Profile on Spotify
              </Button>
              {this.props.yourArtists ? (
                <IconButton
                  color="secondary"
                  aria-label="delete"
                  className={classes.margin}
                  size="medium"
                >
                  <Delete />
                </IconButton>
              ) : (
                // <Button
                //   variant="contained"
                //   color="secondary"
                //   className={classes.button}
                //   onClick={() => this.props.removeArtist(this.props.name)}
                //   startIcon={<Delete />}
                // >
                //   Delete
                // </Button>
                <Button
                  color="secondary"
                  className={classes.button}
                  onClick={() => this.props.addArtist(this.props.name)}
                >
                  Add to Your Artists
                </Button>
              )}
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    );
  }
}

export default withStyles(styles)(ArtistCard);
