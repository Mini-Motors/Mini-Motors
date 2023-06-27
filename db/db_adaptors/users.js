const client = require('../client');

async function createUser({ username, password, isAdmin }) {
  try {
    const { rows: [ user ] } = await client.query(/*sql*/`
      INSERT INTO users (username, password, "isAdmin") 
      VALUES ($1, $2, $3)
      ON CONFLICT (username) DO NOTHING
      RETURNING *;
    `, [ username, password, isAdmin ]);
    // delete user.password;
    return user;
  } catch (error) {
    console.error("Error creating user!", error);
    throw error;
  }
}

async function getAllUsers() {
  try {
    const { rows } = await client.query(/*sql*/`
      SELECT * FROM users;
    `);
    return rows;
  } catch (error) {
    console.error("Error fetching all users!", error);
    throw error;
  }
}

async function getUser() {
  try {
    const { rows } = await client.query(/*sql*/`
      SELECT * FROM users LIMIT 1;
    `);
    return rows[0];
  } catch (error) {
    console.error("Error fetching user!", error);
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const { rows } = await client.query(/*sql*/`
      SELECT * FROM users WHERE id = $1;
    `, [userId]);
    return rows[0];
  } catch (error) {
    console.error("Error fetching user by ID!", error);
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const { rows } = await client.query(/*sql*/`
      SELECT * FROM users WHERE username = $1;
    `, [username]);
    return rows[0];
  } catch (error) {
    console.error("Error fetching user by username!", error);
    throw error;
  }
}

module.exports = {
  // add your database adapter fns here
  getAllUsers,
  createUser,
  getUser, 
  getUserById,
  getUserByUsername
};