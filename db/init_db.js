const {
  client,
  createCar,
  // declare your model imports here
  // for example, User
} = require('./');

// const client = require('./client');

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
        type VARCHAR(255) NOT NULL,
        color VARCHAR(255) NOT NULL
      );
      CREATE TABLE listings (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        price VARCHAR(255) NOT NULL,
        description VARCHAR(255)
      );
      CREATE TABLE car_listings (
        id SERIAL PRIMARY KEY, 
        "carId" INTEGER REFERENCES cars(id),
        "listingId" INTEGER REFERENCES listings(id),
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

//! SEED DATA
async function createInitialCars() {
      console.log("Starting to create cars...")
      try {
        const carsToCreate = [
          { manufacturer: "Chevrolet", model: "SUV", type: "Domestic", color: "red" },
          { manufacturer: "Chevrolet", model: "FullSize", type: "Foreign", color: "red" },
          { manufacturer: "Chevrolet", model: "Compact", type: "Domestic", color: "red" },

          { manufacturer: "Ford", model: "SUV", type: "Foreign", color: "red" },
          { manufacturer: "Ford", model: "FullSize ", type: "Foreign", color: "red" },
          { manufacturer: "Ford", model: "Compact", type: "Domestic", color: "red" },

          { manufacturer: "Dodge/Ram", model: "SUV", type: "Domestic", color: "red" },
          { manufacturer: "Dodge/Ram", model: "FullSize", type: "Domestic", color: "red"  },
          { manufacturer: "Dodge/Ram", model: "Compact", type: "Foreign", color: "red" },

          { manufacturer: "Nissan", model: "SUV", type: "Foreign", color: "red" },
          { manufacturer: "Nissan", model: "FullSize", type: "Foreign", color: "red"  },
          { manufacturer: "Nissan", model: "Compact", type: "Foreign", color: "red" },

          { manufacturer: "Toyota", model: "SUV", type: "Foreign", color: "red" },
          { manufacturer: "Toyota", model: "FullSize", type: "Domestic", color: "red" },
          { manufacturer: "Toyota", model: "Compact", type: "Foreign", color: "red" },

          { manufacturer: "Acura", model: "SUV", type: "Domestic", color: "red" },
          { manufacturer: "Acura", model: "FullSize", type: "Domestic", color: "red" },
          { manufacturer: "Acura", model: "Compact", type: "Foreign", color: "red" }
        ];

        const cars = await Promise.all(carsToCreate.map(createCar));

        console.log("Cars created:")
        console.log(cars)
        console.log("Finished creating cars!")
      } catch (error) {
        console.error("Error creating cars!")
        throw error
      }
    }

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
    await createInitialCars();
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
