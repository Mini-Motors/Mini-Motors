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

async function getCarListingById(id) {
    try {
    const { rows: [ car_listing ] } = await client.query(/*sql*/`
      SELECT * 
      FROM car_listings
      WHERE id = $1
    `, [ id ]);
    return car_listing;
  } catch (error) {
    console.error("Error getting car listing by id!", error);
    throw error; 
  }
}

async function getCarListingsByListing({ id }) {
  try {
    const { rows } = await client.query(/*sql*/`
      SELECT * 
      FROM car_listings
      WHERE id = $1
    `, [ id ]);
    return rows;
  } catch (error) {
    console.error("Error getting car listings by listing!", error);
  }
}

async function updateCarListing({ id, ...fields }) {
  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }" = $${ index + 1 }`
  ).join(', ');
  if (setString.length === 0) {
    return;
  }
  try {
    const { rows: [ car_listing ] } = await client.query(/*sql*/`
      UPDATE car_listings
      SET ${ setString }
      WHERE id = ${ id }
      RETURNING *;
    `, Object.values(fields));
    return car_listing;
  } catch (error) {
    console.error("Error updating car listing!", error);
  }
}

async function destroyCarListing(id) {
    try {
    const { rows: [ car_listing ] } = await client.query(/*sql*/`
      DELETE 
      FROM car_listings
      WHERE id = $1
      RETURNING *;
    `, [ id ]);
    return car_listing;
  } catch (error) {
    console.error("Error deleting car listing!", error);
    throw error; 
  }
}

async function canEditCarListing(carListingId, userId) {
    try {
    const { rows: [ car_listing ] } = await client.query(/*sql*/`
      SELECT * 
      FROM car_listings
      WHERE id = $1
    `, [ carListingId ]);
    const listingId = car_listing.listingId;
    const { rows: [ listing ] } = await client.query(/*sql*/`
      SELECT * 
      FROM listings
      WHERE id = $1
    `, [ listingId ]);
    if (listing.creatorId === userId) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error editing car listing!", error);
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
  getCarListingById,
  getCarListingsByListing,
  updateCarListing,
  destroyCarListing,
  canEditCarListing,
  getListingSubtotal
};