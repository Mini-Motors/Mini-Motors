const client = require('../client');

async function createCar({ manufacturer, model, type, color, price }) {
  try {
    const { rows: [ car ] } = await client.query(/*sql*/`
      INSERT INTO cars (manufacturer, model, type, color, price) 
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `, [ manufacturer, model, type, color, price ]);
    return car;
  } catch (error) {
    console.error("Error creating car!", error);
    throw error;
  }
}

async function getAllCars() {
  try {
    const { rows } = await client.query(/*sql*/`
      SELECT * 
      FROM cars   
    `);
    return rows;
  } catch (error) {
    console.error("Error getting all cars!", error);
    throw error;
  }
}

module.exports = {
  createCar,
  getAllCars
};
