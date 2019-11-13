import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  button: {
    margin: theme.spacing(1),
    width: 100
  }
});

class HomeForm extends Component {
  state = {
    artistName: '',
    songName: ''
  };

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const artist = {
      artistName: this.state.artistName,
      songName: this.state.songName
    };
    await axios.post('/api/artists/add', { artist });
    await this.props.handleSubmit(artist);
  }

  render() {
    const { classes } = this.props;
    return (
      <form
        className={classes.container}
        onSubmit={this.handleSubmit.bind(this)}
      >
        <TextField
          onChange={this.handleChange.bind(this)}
          id="artistName"
          name="artistName"
          className={classes.textField}
          label="artistName"
          margin="normal"
        />
        <TextField
          onChange={this.handleChange.bind(this)}
          id="songName"
          name="songName"
          className={classes.textField}
          label="songName"
          type="songName"
          margin="normal"
        />
        <br />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Submit
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(HomeForm);
