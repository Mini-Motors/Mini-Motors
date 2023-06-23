const client = require('./client');
const models = require('./db_adaptors');

module.exports = {
  client,
  ...db_adaptors,
};
