const client = require('./client');
const db_adaptors = require('./db_adaptors');

module.exports = {
  client,
  ...db_adaptors,
};
