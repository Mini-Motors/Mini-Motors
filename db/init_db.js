const {
  client,
  // declare your model imports here
  // for example, User
} = require('./');


client.connect();

//! DROP TABLES
async function dropTables() {
  console.log("Dropping All Tables...")
  // drop all tables, in the correct order
  try {
    await client.query(/*sql*/`
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
        manufacturer VARCHAR(255) UNIQUE NOT NULL,
        model VARCHAR(255) UNIQUE NOT NULL,
        type VARCHAR(255) NOT NULL
      );

      CREATE TABLE listings (
        id SERIAL PRIMARY KEY,
        "carId" INTEGER REFERENCES cars(id),
        "userId" INTEGER REFERENCES users(id),
        price VARCHAR(255) NOT NULL,
        description VARCHAR(255),
        UNIQUE ("carId", "userId")
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
    dropTables();
   
    /* build tables in correct order */
    buildTables();
      
  } catch (error) {
    throw error;
  }
}


async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })

    await buildTables();

  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
