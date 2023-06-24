const express = require('express');
const carListingsRouter = express.Router();
const { requireUser } = require('./utils');
const { canEditCarListings, 
  getCarListingById,
  updateCarListing,
  destroyCarListing } = require('../db/db_adaptors');


// PATCH /api/car_listings/:carListingId
carListingsRouter.patch('/:carListingId', requireUser, async (req, res, next) => {
  const id = req.params.carListingId;
  const extendedPrice = req.body.extendedPrice;
  const userId = req.user.id;
  const username = req.user.username;
  try {
    const isValid = await canEditCarListings(id, userId);
    const carListing = await getCarListingById(id);
    const listing = await getListingById(carListing.listingId);
    if (!isValid) {
      throw ({
        error: "Unauthorized",
        name: "User",
        message:  UnauthorizedUpdateError(username, listing.name)
      })
    } else {
      const updatedCarListing = await updateCarListing({
        id,
        extendedPrice
      })
      res.send(updatedCarListing);
    }
  } catch (error) {
    next(error);
  }
});

// DELETE /api/car_listings/:carListingId
carListingsRouter.delete('/:carListingId', requireUser, async (req, res, next) => {
  const id = req.params.carListingId;
  const userId = req.user.id;
  const username = req.user.username;
  try {
    const isValid = await canEditCarListings(id, userId);
    const carListing = await getCarListingById(id);
    const listing = await getListingById(carListing.listingId);
    if (!isValid) {
      throw ({
        statusCode: 403,
        error: "Unauthorized",
        name: "User",
        message:  UnauthorizedDeleteError(username, listing.name)
      })
    } else {
      const deletedCarListing = await destroyCarListing(id);
      res.send(deletedCarListing);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = carListingsRouter;
