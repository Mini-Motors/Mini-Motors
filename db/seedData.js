const {
  createCar,
  createUser,
  createCart,
  addCarToCartItems,
  getAllCars
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

//! POPULATE THE CARTS TABLE WITH TEST DATA (routines)
 async function createInitialCarts() {
  console.log("Starting to create carts...")
  try {
    const cartsToCreate = [
      { creatorId: "1", isActive: true, favorites: false },
      { creatorId: "2", isActive: false, favorites: false },
      { creatorId: "3", isActive: true, favorites: true },
      { creatorId: "4", isActive: true, favorites: false },
      { creatorId: "5", isActive: false, favorites: false },
      { creatorId: "6", isActive: true, favorites: true },
      { creatorId: "7", isActive: false, favorites: false },
      { creatorId: "8", isActive: true, favorites: false },
      { creatorId: "9", isActive: false, favorites: true },
      { creatorId: "10", isActive: true, favorites: false },
    ];
    const carts = await Promise.all(cartsToCreate.map(createCart))
    console.log("Carts created:")
    console.log(carts)
    console.log("Finished creating carts!")
  } catch (error) {
    console.error("Error creating carts!")
    throw error
  }
}

//! POPULATE THE CART_ITEMS TABLE WITH TEST DATA (routine_activities)
 async function createInitialCartItems() {
  console.log("Starting to create cart items...")
  try {
    const [ChevroletSUV, 
      FordFullSize, 
      DodgeCompact,
      NissanSUV,
      ToyotaFullSize,
      AcuraCompact,
      ChevroletFullSize,
      FordCompact,
      DodgeSUV,
      NissanFullSize] = await getAllCars();

    const cartItemsToCreate = [
      { cartId: "1", carId: ChevroletSUV.id, currentPrice: ChevroletSUV.price },
      { cartId: "2", carId: FordFullSize.id, currentPrice: FordFullSize.price },
      { cartId: "3", carId: DodgeCompact.id, currentPrice: DodgeCompact.price },
      { cartId: "4", carId: NissanSUV.id, currentPrice: NissanSUV.price },
      { cartId: "5", carId: ToyotaFullSize.id, currentPrice: ToyotaFullSize.price },
      { cartId: "6", carId: AcuraCompact.id, currentPrice: AcuraCompact.price },
      { cartId: "7", carId: ChevroletFullSize.id, currentPrice: ChevroletFullSize.price },
      { cartId: "8", carId: FordCompact.id, currentPrice: FordCompact.price },
      { cartId: "9", carId: DodgeSUV.id, currentPrice: DodgeSUV.price },
      { cartId: "10", carId: NissanFullSize.id, currentPrice: NissanFullSize.price }
    ];
    const cartItems = await Promise.all(cartItemsToCreate.map(addCarToCartItems))
    console.log("Cart items created:")
    console.log(cartItems)
    console.log("Finished creating cart items!")
  } catch (error) {
    console.error("Error creating cart items!")
    throw error
  }
}

module.exports = {
  createInitialUsers,
  createInitialCars,
  createInitialCarts,
  createInitialCartItems
};
