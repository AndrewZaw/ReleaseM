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

const getSpecificArtist = async (token, artist) => {
  const url = `https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=1`;
  const response = await axios({
    url,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data.artists.items[0];
};

router.post('/', async (req, res) => {
  try {
    const token = await getToken();
    const artists = await getArtists(token, req.body.artist);
    res.send(artists);
  } catch {
    res.status(400).send(err);
  }
});

router.post('/add', async (req, res) => {
  const authToken = req.body['auth-token'];
  const tokenSecret = getTokenSecret();
  try {
    const userId = await jwt.verify(authToken, tokenSecret);
    if (!userId) {
      res.statusMessage = 'Not Logged In';
      res.status(400).end();
    }
    const artist = req.body.artist;
    User.findOne({ _id: userId }, (err, user) => {
      if (err) {
        res.status(400).send(err);
      }
      if (user.artists.includes(artist)) {
        res.statusMessage = 'Artist already added';
        res.status(409).end();
      } else {
        user.artists.push(artist);
        user.save();
        res.send(artist);
      }
    });
  } catch (err) {
    res.statusMessage = 'Could not add artist';
    res.status(400).end();
  }
});

router.post('/remove', async (req, res) => {
  const authToken = req.body['auth-token'];
  const tokenSecret = getTokenSecret();
  try {
    const userId = await jwt.verify(authToken, tokenSecret);
    if (!userId) {
      res.statusMessage = 'Not Logged In';
      res.status(400).end();
    }
    const artist = req.body.artist;
    User.findOne({ _id: userId }, (err, user) => {
      if (err) {
        res.status(400).send(err);
      }
      if (!user.artists.includes(artist)) {
        res.statusMessage = 'Artist not in your artists';
        res.status(409).end();
      } else {
        user.artists = user.artists.filter(element => element !== artist);
        user.save();
        res.send(artist);
      }
    });
  } catch (err) {
    res.statusMessage = 'Could not add artist';
    res.status(400).end();
  }
});

router.post('/account', async (req, res) => {
  const authToken = req.body['auth-token'];
  const tokenSecret = getTokenSecret();
  try {
    const userId = await jwt.verify(authToken, tokenSecret);
    const token = await getToken();
    if (!userId) {
      res.statusMessage = 'Not Logged In';
      res.status(400).end();
    }
    User.findOne({ _id: userId }, async (err, user) => {
      if (err) {
        res.status(400).send(err);
      } else {
        let artistsInfo = [];
        for (artist of user.artists) {
          artistsInfo.push(await getSpecificArtist(token, artist));
        }
        res.send(artistsInfo);
      }
    });
  } catch (err) {
    res.statusMessage = 'Could not find your artists';
    res.status(400).end();
  }
});

module.exports = router;
