const express = require('express');
const router = express.Router();
const axios = require('axios');
const { clientId, clientSecret } = require('./getClientIdAndSecret');

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

const getArtists = async (token, artist) => {
  const url = `https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=20`;
  const response = await axios({
    url,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const artists = response.data.artists.items;
  return artists;
};

router.post('/', async (req, res) => {
  try {
    const token = await getToken();
    console.log(token);
    const artists = await getArtists(token, req.body.artist);
    console.log(artists);
    res.send(artists);
  } catch {
    console.log('Error getting artists');
  }
});

module.exports = router;
