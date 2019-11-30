const express = require('express');
const router = express.Router();
const axios = require('axios');
const { clientId, clientSecret } = require('./methods/getClientIdAndSecret');
const jwt = require('jsonwebtoken');
const getTokenSecret = require('./methods/getTokenSecret');
const { User } = require('../../models');

const getToken = async () => {
  const response = await axios({
    url: 'https://accounts.spotify.com/api/token',
    method: 'post',
    params: {
      grant_type: 'client_credentials'
    },
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    auth: {
      username: clientId,
      password: clientSecret
    }
  });
  const token = response.data.access_token;
  return token;
};

const getArtists = userId => {
  User.findOne({ _id: userId }, (err, user) => {
    if (err) {
      return err;
    }
    console.log(user.artists);
    return user.artists;
  });
};

const getSongs = async (token, artist, amount = 50) => {
  let songs = [];
  for (let i = 0; i < amount; i += 50) {
    const url = `https://api.spotify.com/v1/search?q=${artist}&type=track&limit=50&offset=${i}`;
    const response = await axios({
      url,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    songs = [...songs, ...response.data.tracks.items];
  }
  return songs;
};

router.post('/', async (req, res) => {
  const authToken = req.body['auth-token'];
  const tokenSecret = getTokenSecret();
  try {
    const userId = await jwt.verify(authToken, tokenSecret);
    if (!userId) {
      res.statusMessage = 'Not Logged In';
      res.status(400).end();
    }
    const artists = getArtists(userId);
    const spotifyToken = await getToken();
    let songs = [];
    console.log('artists', artists);
    for (let artist of artists) {
      const newSongs = await getSongs(spotifyToken, artist.toLowerCase(), 500);
      songs = [...songs, ...newSongs];
    }
    res.send(songs);
  } catch (err) {
    res.statusMessage = 'Could not get songs';
    res.status(400).end();
  }
});

module.exports = router;
