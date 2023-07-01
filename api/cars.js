const express = require("express");
const carsRouter = express.Router();
const { requireUser } = require("./utils");
const {
  getAllCars,
  getCarsByManufacturer,
  getCarsByModel,
  getCarsByType,
  getCarsByColor,
  getCarsById,
  updateCar,
} = require("../db/db_adaptors");

// GET /cars
carsRouter.get("/", async (req, res, next) => {
  try {
    const cars = await getAllCars();

    res.send(allCars);
  } catch (error) {
    next(error);
  }
});

// GET/cars/:id
carsRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const cars = await getCarsById(id);
    if (!cars) {
      res.send({
        error: "IdNotFoundError ",
        name: "IdNotFoundError",
        message: `Car ${id} not found`,
      });
    }
    res.send(cars);
  } catch (error) {
    next(error);
  }
});

//GET/cars/:manufacterer
carsRouter.get("/:manufacturer", async (req, res, next) => {
  const { manufacturer } = req.params;
  try {
    const cars = await getCarsByManufacturer(manufacturer);
    res.send(cars);
  } catch (error) {
    next(error);
  }
});

// GET /cars/:model
carsRouter.get("/:model", async (req, res, next) => {
  const { model } = req.params;
  try {
    const cars = await getCarsByModel(model);
    res.send(cars);
  } catch (error) {
    next(error);
  }
});

// GET /cars/:type
carsRouter.get("/:type", async (req, res, next) => {
  const { type } = req.params;
  try {
    const cars = await getCarsByType(type);
    res.send(cars);
  } catch (error) {
    next(error);
  }
});

carsRouter.get("/:color", requireUser, async (req, res, next) => {
  const { color } = req.params;

  try {
    const cars = await getCarsByColor(color);
    res.send(color);
  } catch (error) {
    next(error);
  }
});

carsRouter.patch("/:carId", async (req, res, next) => {
  const { carId } = req.params;
  const updateFields = {};
  const { manufacturer, model, type, color, price } = req.body;

  if (manufacturer) {
    updateFields.manufacturer = manufacturer;
  }

  if (model) {
    updateFields.model = model;
  }

  if (type) {
    updateFields.type = type;
  }

  if (color) {
    updateFields.color = color;
  }

  if (price) {
    updateFields.price = price;
  }

  try {
    const originalCar = await getCarsById(carId);
    if (!originalCar) {
      res.send({
        error: "IdNotFoundError",
        name: "IdNotFoundError",
        message: `Car ${id} not found`,
      });
    }

    if (user.isAdmin) {
      const updatedCar = await updateCar(carId, updateFields);
      res.send(updatedCar);
    } else {
      res.send({
        error: "Unauthorized",
        name: "User",
        message: "Administartor required",
      });
    }
  } catch (error) {
    next(error);
  }
});

// POST /api/cars
carsRouter.post("/", async (req, res, next) => {});

module.exports = carsRouter;