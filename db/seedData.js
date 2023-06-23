const {
  createCar,
  createUser,
  createListing,
  addCarToListing
} = require('./db_adaptors');

//! POPULATE THE CARS TABLE WITH TEST DATA (activities)
async function createInitialCars() {
  console.log("Starting to create cars...")
  try {
    const carsToCreate = [
      { manufacturer: "Chevrolet", model: "SUV", type: "Domestic"},
      { manufacturer: "Chevrolet", model: "FullSize", type: "Foreign" },
      { manufacturer: "Chevrolet", model: "Compact", type: "Domestic" },
      { manufacturer: "Ford", model: "SUV", type: "Foreign"},
      { manufacturer: "Ford", model: "FullSize ", type: "Foreign" },
      { manufacturer: "Ford", model: "Compact", type: "Domestic", },
      { manufacturer: "Dodge", model: "SUV", type: "Domestic" },
      { manufacturer: "Dodge", model: "FullSize", type: "Domestic" },
      { manufacturer: "Dodge", model: "Compact", type: "Foreign" },
      { manufacturer: "Nissan", model: "SUV", type: "Foreign" },
      { manufacturer: "Nissan", model: "FullSize", type: "Foreign" },
      { manufacturer: "Nissan", model: "Compact", type: "Foreign" },
      { manufacturer: "Toyota", model: "SUV", type: "Foreign" },
      { manufacturer: "Toyota", model: "FullSize", type: "Domestic" },
      { manufacturer: "Toyota", model: "Compact", type: "Foreign" },
      { manufacturer: "Acura", model: "SUV", type: "Domestic", },
      { manufacturer: "Acura", model: "FullSize", type: "Domestic" },
      { manufacturer: "Acura", model: "Compact", type: "Foreign" }
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

//! POPULATE THE USERS TABLE WITH TEST DATA (users)
 async function createInitialUsers() {
  console.log("Starting to create users...")
  try {
    const usersToCreate = [
      { username: "John Doe", password: "johndoe" },
      { username: "Tim Jones", password: "timjones" },
      { username: "Mark Noone", password: "marknoone" },
      { username: "John None", password: "johnnone" },
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

//! POPULATE THE LISTINGS TABLE WITH TEST DATA (routines)
 async function createInitialListings() {
  console.log("Starting to create Listings...")
  try {
    const listingsToCreate = [
      { creatorId: 1, name: "Listing1", price: "100.00", color: "red" },
      { creatorId: 1, name: "Listing2", price: "200.00", color: "red" },
      { creatorId: 2, name: "Listing3", price: "300.00", color: "red" },
      { creatorId: 2, name: "Listing4", price: "400.00", color: "red" },
      { creatorId: 3, name: "Listing5", price: "500.00", color: "red" },
      { creatorId: 3, name: "Listing6", price: "600.00", color: "red" },
      { creatorId: 4, name: "Listing7", price: "700.00", color: "red" },
      { creatorId: 5, name: "Listing8", price: "800.00", color: "red" },
      { creatorId: 6, name: "Listing9", price: "900.00", color: "red" },
      { creatorId: 7, name: "Listing10", price: "1000.00", color: "red" },
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

//! POPULATE CARS_LISTINGS TABLE WITH TEST DATA (routine_activities)
async function createInitialCarListings() {
  console.log("starting to create car listings...");

  const [ listing1, 
    listing2, 
    listing3, 
    listing4, 
    listing5, 
    listing6, 
    listing7, 
    listing8, 
    listing9, 
    listing10 ] = await getListingsWithoutCars();

  const [ chevrolet, 
    ford, 
    dodge, 
    nissan, 
    toyota, 
    acura ] = await getAllCars();

  const carListingsToCreate = [
    { carId: chevrolet.id, listingId: listing1.id, extendedPrice: null },
    { carId: chevrolet.id, listingId: listing1.id, extendedPrice: null },
    { carId: chevrolet.id, listingId: listing2.id, extendedPrice: null },
    { carId: ford.id, listingId: listing3.id, extendedPrice: null },
    { carId: ford.id, listingId: listing4.id, extendedPrice: null },
    { carId: ford.id, listingId: listing5.id, extendedPrice: null },
    { carId: dodge.id, listingId: listing6.id, extendedPrice: null },
    { carId: dodge.id, listingId: listing7.id, extendedPrice: null },
    { carId: nissan.id, listingId: listing8.id, extendedPrice: null },
    { carId: nissan.id, listingId: listing9.id, extendedPrice: null },
    { carId: nissan.id, listingId: listing10.id, extendedPrice: null },
    { carId: toyota.id, listingId: listing1.id, extendedPrice: null },
    { carId: toyota.id, listingId: listing2.id, extendedPrice: null },
    { carId: toyota.id, listingId: listing3.id, extendedPrice: null },
    { carId: acura.id, listingId: listing4.id, extendedPrice: null },
    { carId: acura.id, listingId: listing5.id, extendedPrice: null },
    { carId: acura.id, listingId: listing6.id, extendedPrice: null }
  ];

  const carListings = await Promise.all(
    carListingsToCreate.map(addCarToListing)
  );

  console.log("Car Listings created: ", carListings);
  console.log("Finished creating car listings!");
}


module.exports = {
  createInitialUsers,
  createInitialCars,
  createInitialListings,
  createInitialCarListings
};
