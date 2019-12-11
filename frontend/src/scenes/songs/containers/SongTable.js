import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  table: {
    marginTop: '1.5em'
  },
  tableRow: {
    '&:hover': {
      background: 'rgb(63, 81, 181, 0.08) !important'
    }
  },
  leadArtist: {
    fontWeight: '600',
    display: 'inline'
  },
  featuredArtist: {
    fontWeight: '400',
    display: 'inline'
  }
});

class SongTable extends Component {
  msToMinutesAndSeconds = ms => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  render() {
    const { classes } = this.props;
    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Song Title</TableCell>
            <TableCell align="right">Release Date</TableCell>
            <TableCell align="right">Album</TableCell>
            <TableCell align="right">Artists</TableCell>
            <TableCell align="right">Length</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.songs.map(song => (
            <TableRow hover key={song.id} className={classes.tableRow}>
              <TableCell component="th" scope="row">
                {song.name}
              </TableCell>
              <TableCell align="right">{song.album.release_date}</TableCell>
              <TableCell align="right">{song.album.name}</TableCell>
              <TableCell align="right">
                {song.artists.map((artist, i) =>
                  i === song.artists.length - 1 ? (
                    <span key={i} className={classes.featuredArtist}>
                      {` ${artist.name}`}
                    </span>
                  ) : (
                    <span
                      key={i}
                      className={
                        i === 0 ? classes.leadArtist : classes.featuredArtist
                      }
                    >
                      {` ${artist.name},`}
                    </span>
                  )
                )}
              </TableCell>
              <TableCell align="right">
                {this.msToMinutesAndSeconds(song.duration_ms)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default withStyles(styles)(SongTable);
