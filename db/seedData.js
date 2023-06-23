const {
  createCar,
  createUser,
  addCarToListing
} = require('./db_adaptors');

//! POPULATE THE CARS TABLE WITH TEST DATA
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

//! POPULATE THE USERS TABLE WITH TEST DATA
 async function createInitialUsers() {
  console.log("Starting to create users...")
  try {
    const usersToCreate = [
      { username: "John Doe", password: "johndoe" },
      { username: "Tim Jones", password: "timjones" },
      { username: "Mark Noone", password: "alisonany" },
      { username: "John Doe", password: "alisonany" },
      { username: "Andy Last", password: "andylast" },
      { username: "Kathy First", password: "kathyfirst" },
      { username: "Anyone Else", password: "anyoneelse" },
    ];
    const users = await Promise.all(usersToCreate.map(createUser))
    console.log("Users created:")
    console.log(users)
    console.log("Finished creating users!")
  } catch (error) {
    console.error("Error creating users!")
    throw error
  }
}

//! POPULATE THE LISTINGS TABLE WITH TEST DATA
 async function createInitialListings() {
  console.log("Starting to create Listings...")
  try {
    const listingsToCreate = [
      { username: "John Doe", password: "johndoe" },
      { username: "Tim Jones", password: "timjones" },
      { username: "Mark Noone", password: "alisonany" },
      { username: "John Doe", password: "alisonany" },
      { username: "Andy Last", password: "andylast" },
      { username: "Kathy First", password: "kathyfirst" },
      { username: "Anyone Else", password: "anyoneelse" },
    ];
    const listings = await Promise.all(listingsToCreate.map(createListing))
    console.log("Listings created:")
    console.log(listings)
    console.log("Finished creating listings!")
  } catch (error) {
    console.error("Error creating listings!")
    throw error
  }
}

module.exports = {
  createInitialCars,
  createInitialUsers,
  createInitialListings
};
