const express = require('express');
const router = express.Router();
const axios = require('axios');

const { clientId } = require('../../../config');
const { clientSecret } = require('../../../config');
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

const getSongs = async (token, artist, offset = 0, amount = 50) => {
  const url = `https://api.spotify.com/v1/search?q=${artist}&type=track&limit=${amount}&offset=${offset}`;
  const response = await axios({
    url,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  console.log(response.data.tracks.items);
  return response.data.tracks.items;
};

router.get('/', async (req, res) => {
  try {
    const songs = [];
    const token = await getToken();
    songs.push(await getSongs(token, 'drake'));
    res.send(songs);
  } catch {
    console.log('Could not reach API');
  }
});

module.exports = router;
