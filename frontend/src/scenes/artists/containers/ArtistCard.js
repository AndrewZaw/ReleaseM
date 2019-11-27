import React, { Component } from 'react';
// import { Card } from '../../../components';
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
          <Grid item xs={3}>
            <CardMedia
              className={classes.media}
              image={this.props.img}
              title={this.props.name}
            />
          </Grid>
          <Grid item xs={6}>
            <CardContent>
              <Typography className={classes.artistName} variant="h4">
                {this.props.name}
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={3}>
            <CardActions className={classes.buttonArea}>
              <Button>Add to Your Artists</Button>
              <Button>See Profile</Button>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    );
  }
}

export default withStyles(styles)(ArtistCard);
