const client = require('../client');

async function addCarToListing({ carId, listingId, extendedPrice = null }) {
    try {
    const { rows: [ car_listing ] } = await client.query(/*sql*/`
      INSERT INTO car_listings ("carId", "listingId", "extendedPrice")
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [ carId, listingId, extendedPrice ]);
    return car_listing;
  } catch (error) {
    console.error("Error adding car to listing!", error);
    throw error; 
  }
}

//! WIP
async function getListingSubtotal (listingId) {
  try {
  const { rows: [ car_listing ] } = await client.query(/*sql*/`
    SELECT listingId, SUM(extendedPrice) AS subtotal
    FROM car_listings
    GROUP BY $1
    RETURNING subtotal;
  ` [ listingId ]);
  return car_listing;
  } catch (error) {
    console.error("Error adding car to listing!", error);
    throw error; 
  }
};

module.exports = {
  addCarToListing,
  getListingSubtotal
};