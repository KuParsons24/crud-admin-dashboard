const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const port = process.env.BACKEND_PORT || 3002;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.use('/crud', express.static(path.join(__dirname, '../build')));

app.get('/crud', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});