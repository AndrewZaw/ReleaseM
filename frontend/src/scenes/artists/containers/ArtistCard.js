import React, { Component } from 'react';
// import { Card } from '../../../components';
import {
  Typography,
  Button,
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
  media: { height: 200, width: 200 }
});

class ArtistCard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={this.props.img}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography className={classes.artistName} variant="h5">
            {this.props.name}
          </Typography>
        </CardContent>
        <CardActions>
          <Button>Add to Your Artists</Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(ArtistCard);
