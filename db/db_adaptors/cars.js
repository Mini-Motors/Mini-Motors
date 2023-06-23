const client = require('../client');

async function createCar({ manufacturer, model, type, color }) {
  try {
    const { rows: [ car ] } = await client.query(/*sql*/`
      INSERT INTO cars (manufacturer, model, type, color) 
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [ manufacturer, model, type, color ]);
    return car;
  } catch (error) {
    console.error("Error creating car!", error);
    throw error;
  }
}

module.exports = {
  createCar,
};
