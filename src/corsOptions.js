const whitelist = [
  'https://accounts.spotify.com',
  'http://localhost:3000',
  'http://localhost:5000',
  'https://releasem.herokuapp.com/'
];
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

module.exports = corsOptions;
