const client = require('../client');

async function addReviewToListing({ userId, listingId, review }) {
    try {
    const { rows: [ car_review ] } = await client.query(/*sql*/`
      INSERT INTO car_reviews ("userId", "listingId", review)
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [ userId, listingId, review ]);
    return car_review;
  } catch (error) {
    console.error("Error adding review to listing!", error);
    throw error; 
  }
}

async function getReviewListingById(id) {
    try {
    const { rows: [ car_review ] } = await client.query(/*sql*/`
      SELECT * 
      FROM car_reviews
      WHERE id = $1
    `, [ id ]);
    return car_review;
  } catch (error) {
    console.error("Error getting car reviews by id!", error);
    throw error; 
  }
}

async function getCarListingsByListing({ id }) {
  try {
    const { rows } = await client.query(/*sql*/`
      SELECT * 
      FROM car_reviews
      WHERE id = $1
    `, [ id ]);
    return rows;
  } catch (error) {
    console.error("Error getting car listings by listing ID!", error);
  }
}

async function updateCarReview({ id, ...fields }) {
  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }" = $${ index + 1 }`
  ).join(', ');
  if (setString.length === 0) {
    return;
  }
  try {
    const { rows: [ car_review ] } = await client.query(/*sql*/`
      UPDATE car_reviews
      SET ${ setString }
      WHERE id = ${ id }
      RETURNING *;
    `, Object.values(fields));
    return car_review;
  } catch (error) {
    console.error("Error updating car review!", error);
  }
}

async function destroyCarReview(id) {
    try {
    const { rows: [ car_review ] } = await client.query(/*sql*/`
      DELETE 
      FROM car_reviews
      WHERE id = $1
      RETURNING *;
    `, [ id ]);
    return car_review;
  } catch (error) {
    console.error("Error deleting car review!", error);
    throw error; 
  }
}

async function canEditCarReview(carReviewId, userId) {
    try {
    const { rows: [ car_review] } = await client.query(/*sql*/`
      SELECT * 
      FROM car_reviews
      WHERE id = $1
    `, [ carReviewId ]);
    const listingId = car_review.listingId;
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
    console.error("Error editing car review!", error);
    throw error; 
  }
}


module.exports = {
  addReviewToListing,
  getCarReviewById,
  getCarListingsByListing,
  getReviewListingById,
  updateCarReview,
  destroyCarReview,
  canEditCarReview,
};