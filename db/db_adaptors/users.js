// grab our db client connection to use with our adapters
const client = require('../client');

async function createUser({ username, password }) {
  try {
    const { rows: [ user ] } = await client.query(/*sql*/`
      INSERT INTO users (username, password) 
      VALUES ($1, $2)
      ON CONFLICT (username) DO NOTHING
      RETURNING *;
    `, [ username, password ]);
    // delete user.password;
    return user;
  } catch (error) {
    console.error("Error creating user!", error);
    throw error;
  }
}

async function getAllUsers() {
  /* this adapter should fetch a list of users from your db */
}

module.exports = {
  // add your database adapter fns here
  getAllUsers,
  createUser,
};