const express = require('express');
const cartRouter = express.Router();
const { requireUser } = require('./utils');

module.exports = cartRouter;
