const {
  client,
  createInitialListings,
  createInitialCars,
  createInitialUsers
} = require('./');


//! DROP TABLES
async function dropTables() {
  console.log("Dropping All Tables...")
  // drop all tables, in the correct order
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
  // create all tables, in the correct order
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
        price VARCHAR(255) NOT NULL
      );
      CREATE TABLE car_listings (
        id SERIAL PRIMARY KEY, 
        "carId" INTEGER REFERENCES cars(id),
        "listingId" INTEGER REFERENCES listings(id),
        color VARCHAR(255) NOT NULL,
        "extendedPrice" VARCHAR(255),
        UNIQUE ("carId", "listingId")
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
    /* connect to client */
    client.connect();
    /* drop tables in correct order */
    await dropTables();
    /* build tables in correct order */
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
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
