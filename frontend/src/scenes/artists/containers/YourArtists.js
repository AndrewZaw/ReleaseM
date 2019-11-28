import React, { Component } from 'react';
import {
  TextField,
  Button,
  InputAdornment,
  IconButton
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ArtistCard from './ArtistCard'
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
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    artist: ''
  };

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const response = await axios.post('/api/artists', {
      artist: this.state.artist
    });
    const artists = response.data;
    console.log(artists);
    this.props.handleSubmit(artists);
  }

  render() {
    const { classes } = this.props;
    return (
      <ArtistCard/>
      
    );
  }
}

export default withStyles(styles)(YourArtists);
