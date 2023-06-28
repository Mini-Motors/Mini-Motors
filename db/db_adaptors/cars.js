const client = require("../client");

async function createCar({ manufacturer, model, type, color, price }) {
  try {
    const {
      rows: [car],
    } = await client.query(
      /*sql*/ `
      INSERT INTO cars (manufacturer, model, type, color, price) 
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `,
      [manufacturer, model, type, color, price]
    );
    return car;
  } catch (error) {
    console.error("Error creating car!", error);
    throw error;
  }
}

async function getAllCars() {
  try {
    const { rows } = await client.query(/*sql*/ `
      SELECT * 
      FROM cars   
    `);
    return rows;
  } catch (error) {
    console.error("Error getting all cars!", error);
    throw error;
  }
}

async function getCarsById(id) {
  try {
    const {
      rows: [car],
    } = await client.query(
      /*sql*/ `
    SELECT *
    FROM cars
    WHERE id = $1;
    `,
      [id]
    );
    return car;
  } catch (error) {
    console.error("Error in getCarsById", error);
    throw error;
  }
}

async function getCarsByManufacturer(manufacturer) {
  try {
    const {
      rows: [car],
    } = await client.query(
      /*sql*/ `
    SELECT *
    FROM cars
    WHERE manufacturer = $1;
    `,
      [manufacturer]
    );
    return car;
  } catch (error) {
    console.error("Error in getCarsByManufacturer", error);
    throw error;
  }
}

async function getCarsByModel(model) {
  try {
    const {
      rows: [car],
    } = await client.query(
      /*sql*/ `
    SELECT *
    FROM cars
    WHERE model = $1;
    `,
      [model]
    );
    return car;
  } catch (error) {
    console.error("Error in getCarsByModel", error);
    throw error;
  }
}

async function getCarsByType(type) {
  try {
    const {
      rows: [car],
    } = await client.query(
      /*sql*/ `
    SELECT *
    FROM cars
    WHERE type = $1;
    `,
      [type]
    );
    return car;
  } catch (error) {
    console.error("Error in getCarsByType", error);
    throw error;
  }
}

async function getCarsByColor(color) {
  try {
    const {
      rows: [car],
    } = await client.query(
      /*sql*/ `
    SELECT *
    FROM cars
    WHERE color = $1;
    `,
      [color]
    );
    return car;
  } catch (error) {
    console.error("Error in getCarsByColor", error);
    throw error;
  }
}

module.exports = {
  createCar,
  getAllCars,
  getCarsById,
  getCarsByManufacturer,
  getCarsByModel,
  getCarsByType,
  getCarsByColor,
};
