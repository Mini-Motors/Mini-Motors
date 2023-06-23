const client = require('./client');

module.exports = {
  client,
  ...require('./db_adaptors'),
  ...require('./seedData')
};
