const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, '../../frontend')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '../../frontend'));
// });

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
