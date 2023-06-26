const {
  createCar,
  createUser,
  createListing,
  getListingsWithoutCars,
  addReviewToListing
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
      { creatorId: 1, "carId": 1, name: "Listing1", price: "100.00", color: "red" },
      { creatorId: 1, "carId": 2, name: "Listing2", price: "200.00", color: "blue" },
      { creatorId: 2, "carId": 3, name: "Listing3", price: "300.00", color: "green" },
      { creatorId: 2, "carId": 4, name: "Listing4", price: "400.00", color: "red" },
      { creatorId: 3, "carId": 5, name: "Listing5", price: "500.00", color: "blue" },
      { creatorId: 3, "carId": 6, name: "Listing6", price: "600.00", color: "green" },
      { creatorId: 4, "carId": 7, name: "Listing7", price: "700.00", color: "red" },
      { creatorId: 5, "carId": 8, name: "Listing8", price: "800.00", color: "blue" },
      { creatorId: 6, "carId": 9, name: "Listing9", price: "900.00", color: "green" },
      { creatorId: 7, "carId": 10, name: "Listing10", price: "1000.00", color: "red" },
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
async function createInitialCarReviews() {
  console.log("starting to create car reviews...");

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

  const carReviewsToCreate = [
    { userId: 1, listingId: listing1.id, review: "Great" },
    { userId: 1, listingId: listing2.id, review: "Great" },
    { userId: 1, listingId: listing3.id, review: "Great" },
    { userId: 2, listingId: listing4.id, review: "Great" },
    { userId: 2, listingId: listing5.id, review: "Great" },
    { userId: 2, listingId: listing6.id, review: "Great" },
    { userId: 3, listingId: listing7.id, review: "Great" },
    { userId: 3, listingId: listing8.id, review: "Great" },
    { userId: 3, listingId: listing9.id, review: "Great" },
    { userId: 4, listingId: listing10.id, review: "Great" },
    { userId: 4, listingId: listing1.id, review: "Great" },
    { userId: 4, listingId: listing2.id, review: "Great" },
    { userId: 5, listingId: listing3.id, review: "Great" },
    { userId: 5, listingId: listing4.id, review: "Great" },
    { userId: 6, listingId: listing5.id, review: "Great" },
    { userId: 6, listingId: listing6.id, review: "Great" },
    { userId: 7, listingId: listing7.id, review: "Great" }
  ];

  const carReviews = await Promise.all(
    carReviewsToCreate.map(addReviewToListing)
  );
  console.log("Car reviews created: ", carReviews);
  console.log("Finished creating car reviews!");
  
}

module.exports = {
  createInitialUsers,
  createInitialCars,
  createInitialListings,
  createInitialCarReviews,
};
