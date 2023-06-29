const express = require("express");
const carReviewsRouter = express.Router();
const { requireUser } = require("./utils");
const {
  canEditCarReviews,
  getCarReviewById,
  updateCarReview,
  destroyCarReview,
} = require("../db/db_adaptors");

// PATCH /api/car_reviews/:carReviewId
carReviewsRouter.patch("/:carReviewId", requireUser, async (req, res, next) => {
  const id = req.params.carReviewId;
  const review = req.body.review;
  const userId = req.user.id;
  const username = req.user.username;
  try {
    const isValid = await canEditCarReviews(id, userId);
    const carReview = await getCarReviewById(id);
    const listing = await getListingById(carReview.listingId);
    if (!isValid) {
      throw {
        error: "Unauthorized",
        name: "User",
        message: UnauthorizedUpdateError(username, listing.name),
      };
    } else {
      const updatedCarReview = await updateCarReview({
        id,
        review,
      });
      res.send(updatedCarReview);
    }
  } catch (error) {
    next(error);
  }
});

// DELETE /api/car_reviews/:carReviewId
carListingsRouter.delete(
  "/:carReviewId",
  requireUser,
  async (req, res, next) => {
    const id = req.params.carReviewId;
    const userId = req.user.id;
    const username = req.user.username;
    try {
      const isValid = await canEditCarReviews(id, userId);
      const carListing = await getCarReviewById(id);
      const listing = await getReviewById(carReview.listingId);
      if (!isValid) {
        throw {
          statusCode: 403,
          error: "Unauthorized",
          name: "User",
          message: UnauthorizedDeleteError(username, listing.name),
        };
      } else {
        const deletedCarReview = await destroyCarReview(id);
        res.send(deletedCarReview);
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = carReviewsRouter;
