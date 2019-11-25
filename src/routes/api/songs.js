const express = require('express');
const router = express.Router();
const axios = require('axios');

const { clientId } = require('../../../config');
const { clientSecret } = require('../../../config');
const redirectUri = 'https://releasem.herokuapp.com/';
const authOptions = 'sfds';

router.get('/', async (req, res) => {
  try {
    const tokenResponse = await axios({
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
    const token = tokenResponse.data.access_token;
    const songSearchResponse = await axios({
      url: 'https://api.spotify.com/v1/search/?q=drake&type=track',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(songSearchResponse);
    res.send(songSearchResponse.data.tracks.items);
  } catch {
    console.log('Could not reach API');
  }
});

module.exports = router;
