const client = require('../client');
const bcrypt = require('bcrypt');

async function createUser({ username, password, isAdmin }) {
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

  try {
    const { rows: [ user ] } = await client.query(/*sql*/`
      INSERT INTO users (username, password, "isAdmin") 
      VALUES ($1, $2, $3)
      ON CONFLICT (username) DO NOTHING
      RETURNING *;
    `, [ username, hashedPassword, isAdmin ]);
    delete user.Password;
    return user;
  } catch (error) {
    console.error("Error creating user!", error);
    throw error;
  }
}

async function getAllUsers() {
  try {
    const { rows } = await client.query(/*sql*/`
      SELECT * 
      FROM users;
    `);
    return rows;
  } catch (error) {
    console.error("Error fetching all users!", error);
    throw error;
  }
}

async function getUser({ username, password }) {
  const user = await getUserByUsername(username);
  const hashedPassword = user.password;
  const isValid = await bcrypt.compare(password, hashedPassword)
  if (isValid) {
    delete user.password;
    return user;
  }
}

async function getUserById(userId) {
  try {
    const { rows: [ user ] } = await client.query(/*sql*/`
      SELECT * 
      FROM users 
      WHERE id = $1;
    `, [ userId ]);
    delete user.password
    return user;
  } catch (error) {
    console.error("Error fetching user by ID!", error);
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const { rows: [ user ] } = await client.query(/*sql*/`
      SELECT * 
      FROM users 
      WHERE username = $1;
    `, [ username ]);
    return user;
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