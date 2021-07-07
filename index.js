'use strict';
require('dotenv').config();
const server = require('./src/server');
const pool = require('./src/models/pool');
const PORT = process.env.PORT || 3002;
const MONGODB_URI = process.env.MONGODB_URI;

pool
  .connect()
  .then(() => {
    server.start(PORT);
  })
  .catch((e) => {
    console.error('CONNECTION ERROR', e.message);
  });