const {
  createCar,
  createUser,
  createCart,
  addCarToCartItems
} = require('./db_adaptors');

//! POPULATE THE CARS TABLE WITH TEST DATA (activities)
async function createInitialCars() {
  console.log("Starting to create cars...")
  try {
    const carsToCreate = [
      { manufacturer: "Chevrolet", model: "SUV", type: "Domestic", color: "red", price: "1000.00" },
      { manufacturer: "Chevrolet", model: "FullSize", type: "Foreign", color: "green", price: "100.00" },
      { manufacturer: "Chevrolet", model: "Compact", type: "Domestic", color: "blue", price: "10.00" },
      { manufacturer: "Ford", model: "SUV", type: "Foreign", color: "red", price: "1000.00" },
      { manufacturer: "Ford", model: "FullSize ", type: "Foreign", color: "green", price: "100.00" },
      { manufacturer: "Ford", model: "Compact", type: "Domestic", color: "blue", price: "10.00" },
      { manufacturer: "Dodge", model: "SUV", type: "Domestic", color: "red", price: "1000.00" },
      { manufacturer: "Dodge", model: "FullSize", type: "Domestic", color: "green", price: "100.00" },
      { manufacturer: "Dodge", model: "Compact", type: "Foreign", color: "blue", price: "10.00" },
      { manufacturer: "Nissan", model: "SUV", type: "Foreign", color: "red", price: "1000.00" },
      { manufacturer: "Nissan", model: "FullSize", type: "Foreign", color: "green", price: "100.00" },
      { manufacturer: "Nissan", model: "Compact", type: "Foreign", color: "blue", price: "10.00" },
      { manufacturer: "Toyota", model: "SUV", type: "Foreign", color: "red", price: "1000.00" },
      { manufacturer: "Toyota", model: "FullSize", type: "Domestic", color: "green", price: "100.00" },
      { manufacturer: "Toyota", model: "Compact", type: "Foreign", color: "blue", price: "10.00" },
      { manufacturer: "Acura", model: "SUV", type: "Domestic", color: "red", price: "1000.00" },
      { manufacturer: "Acura", model: "FullSize", type: "Domestic", color: "green", price: "100.00" },
      { manufacturer: "Acura", model: "Compact", type: "Foreign", color: "blue", price: "10.00" }
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
      { username: "John Doe", password: "johndoe", isAdmin: false },
      { username: "Tim Jones", password: "timjones", isAdmin: false },
      { username: "Mark Noone", password: "marknoone", isAdmin: false },
      { username: "John None", password: "johnnone", isAdmin: false },
      { username: "Andy Last", password: "andylast", isAdmin: false },
      { username: "Kathy First", password: "kathyfirst", isAdmin: false },
      { username: "Anyone Else", password: "anyoneelse", isAdmin: false },
      { username: "Kevin", password: "Kevin12345", isAdmin: true },
      { username: "Brandon", password: "Brandon12345", isAdmin: true },
      { username: "Nick", password: "Nick12345", isAdmin: true },
      { username: "Ricky", password: "Ricky12345", isAdmin: true }
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

module.exports = {
  createInitialUsers,
  createInitialCars,
};
