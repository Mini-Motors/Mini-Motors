// Connect to DB
require('dotenv').config();
const { Client } = require("pg");
const  { DATABASE_URL } = process.env;

// change the DB_NAME string to whatever your group decides on
const DB_NAME = "minimotors";

const DB_URL = DATABASE_URL || `postgres://pi-ai:5432/${DB_NAME}`;

const client = new Client(DB_URL);

module.exports = client;
