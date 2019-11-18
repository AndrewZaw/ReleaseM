const express = require('express');
const app = express();
const path = require('path');
require('./db');
require('dotenv').config();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/api/users'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
app.listen(port);
