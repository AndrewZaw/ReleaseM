const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  artistName: String,
  songName: String
});

const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = { Artist };
