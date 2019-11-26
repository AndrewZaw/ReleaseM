const express = require('express');
const router = express.Router();
const axios = require('axios');

const { clientId } = require(process.env.clientId || '../../../config');
const { clientSecret } = require(process.env.clientSecret || '../../../config');
const redirectUri = 'https://releasem.herokuapp.com/';
const authOptions = 'sfds';

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
  try {
    const artists = req.body.artists;
    const token = await getToken();
    let songs = [];
    for (artist of artists) {
      const newSongs = await getSongs(token, artist, 150);
      songs = [...songs, ...newSongs];
    }
    res.send(songs);
  } catch {
    console.log('Error getting songs');
  }
});

module.exports = router;
