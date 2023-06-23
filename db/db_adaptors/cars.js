const client = require('../client');

async function createCar({ manufacturer, model, type }) {
  try {
    const { rows: [ car ] } = await client.query(/*sql*/`
      INSERT INTO cars (manufacturer, model, type) 
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [ manufacturer, model, type ]);
    return car;
  } catch (error) {
    console.error("Error creating car!", error);
    throw error;
  }
}

module.exports = {
  createCar,
};
