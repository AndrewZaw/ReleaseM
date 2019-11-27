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

class ArtistCard extends Component {
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
          <Grid item xs={2}>
            <CardMedia
              className={classes.media}
              image={this.props.img}
              title={this.props.name}
            />
          </Grid>
          <Grid item xs={4}>
            <CardContent>
              <Typography className={classes.artistName} variant="h4">
                {this.props.name}
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={3}>
            <CardContent>
              <Typography>
                {this.props.monthlyListeners} monthly listeners
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={3}>
            <CardActions className={classes.buttonArea}>
              <Button color="secondary" className={classes.button}>
                Add to Your Artists
              </Button>
              <Button
                color="primary"
                className={classes.button}
                target="_blank"
                href={this.props.profileUrl}
              >
                See Profile on Spotify
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    );
  }
}

export default withStyles(styles)(ArtistCard);
