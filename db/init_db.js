const {
  client,
  createInitialListings,
  createInitialCars,
  createInitialUsers,
  createInitialCarListings,
  subtotal
} = require('./');


//! DROP TABLES
async function dropTables() {
  console.log("Dropping All Tables...")
  try {
    await client.query(/*sql*/`
      DROP TABLE IF EXISTS car_listings;
      DROP TABLE IF EXISTS listings;
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
        password VARCHAR(255) NOT NULL  
      );
      CREATE TABLE cars (
        id SERIAL PRIMARY KEY,
        manufacturer VARCHAR(255) NOT NULL,
        model VARCHAR(255) NOT NULL,
        type VARCHAR(255) NOT NULL
        
      );
      CREATE TABLE listings (
        id SERIAL PRIMARY KEY,
        "creatorId" INTEGER REFERENCES users(id),
        name VARCHAR(255),
        color VARCHAR(255) NOT NULL,
        price VARCHAR(255) NOT NULL
      );
      CREATE TABLE car_listings (
        id SERIAL PRIMARY KEY, 
        "carId" INTEGER REFERENCES cars(id),
        "listingId" INTEGER REFERENCES listings(id),
        "extendedPrice" VARCHAR(255),
        UNIQUE("carId", "listingId")
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
    await createInitialListings();
    await createInitialCarListings();
    await subtotal();
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
