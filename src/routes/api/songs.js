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
    User.findOne({ _id: userId }, async (err, user) => {
      if (err) {
        res.status(400).send(err);
      } else {
        const spotifyToken = await getToken();
        let songs = [];
        const artists = JSON.parse(JSON.stringify(user.artists));
        for (let artist of artists) {
          const newSongs = await getSongs(
            spotifyToken,
            artist.toLowerCase(),
            50
          );
          songs = [...songs, ...newSongs];
        }
        res.send({ songs, artists: artists.map(ele => ele.toLowerCase()) });
      }
    });
  } catch (err) {
    res.statusMessage = 'Could not get songs';
    res.status(400).end();
  }
});

module.exports = router;
