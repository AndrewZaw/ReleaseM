const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./corsOptions');
require('dotenv').config();
// Database
require('./db');

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/songs', require('./routes/api/songs'));
app.use('/api/artists', require('./routes/api/artists'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
app.listen(port);
