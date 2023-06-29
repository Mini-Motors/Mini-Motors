const {
  client,
  createInitialCars,
  createInitialUsers,
  createInitialCarts,
  createInitialCartItems
} = require('./');


//! DROP TABLES
async function dropTables() {
  console.log("Dropping All Tables...")
  try {
    await client.query(/*sql*/`   
      DROP TABLE IF EXISTS cart_items;
      DROP TABLE IF EXISTS cart;
      DROP TABLE IF EXISTS cars;
      DROP TABLE IF EXISTS users;
    `);
  } catch (error) {
    console.error('Error dropping tables!');
    throw error;
  }
}

//! CREATE TABLES
async function createTables() {
  console.log("Starting to build tables...")
  try {
    await client.query(/*sql*/`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        "isAdmin" BOOLEAN DEFAULT false
      );
      CREATE TABLE cars (
        id SERIAL PRIMARY KEY,
        manufacturer VARCHAR(255) NOT NULL,
        model VARCHAR(255) NOT NULL,
        type VARCHAR(255) NOT NULL,
        color VARCHAR(255) NOT NULL,
        price VARCHAR(255) NOT NULL
      );
      CREATE TABLE cart (
        id SERIAL PRIMARY KEY, 
        "creatorId" INTEGER REFERENCES users(id),
        "isActive" BOOLEAN DEFAULT true,
        favorites BOOLEAN DEFAULT false
      );
      CREATE TABLE cart_items (
        id SERIAL PRIMARY KEY, 
        "cartId" INTEGER REFERENCES cart(id),
        "carId" INTEGER REFERENCES cars(id),
        "currentPrice" VARCHAR(255) NOT NULL
      );
    `);
  } catch (error) {
    console.error('Error building tables!');
    throw error;
  }
}

//! BUILD TABLES
async function buildTables() {
  try {
    client.connect();
    await dropTables();
    await createTables();   
  } catch (error) {
    throw error;
  }
}

//! POPULATE INITIAL TABLE DATA 
async function populateInitialData() {
  try {
    await createInitialUsers();
    await createInitialCars();
    await createInitialCarts();
    await createInitialCartItems();
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
