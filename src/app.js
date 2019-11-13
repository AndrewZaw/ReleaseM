const express = require('express');
const app = express();
const path = require('path');
require('./db');
require('dotenv').config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const { User, Artist } = require('./models');

app.get('/api/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.send('error');
      return err;
    }
    res.send({ users });
  });
});

app.post('/api/users/add', (req, res) => {
  const user = req.body.user;
  if (user.username && user.hash) {
    new User({ username: user.username, hash: user.hash })
      .save()
      .then(res.send(user));
  } else {
    res.send('error');
  }
});

app.get('/api/artists', (req, res) => {
  Artist.find({}, (err, artists) => {
    if (err) {
      res.send('error');
      return err;
    }
    res.send({ artists });
  });
});

app.post('/api/artists/add', (req, res) => {
  const artist = req.body.artist;
  if (artist.artistName && artist.songName) {
    new Artist({ artistName: artist.artistName, songName: artist.songName })
      .save()
      .then(res.send(artist));
  } else {
    res.send('error');
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
app.listen(port);
