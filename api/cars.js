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
  getActiveCartsByCarId,
  createCar } = require("../db/db_adaptors");


// GET /api/cars/:carId/cart
carsRouter.get('/:carId/cart', async (req, res, next) => {
  const carId = req.params.carId;
  try {
    const activeCarts = await getActiveCartsByCarId({ id: carId });
    if (activeCarts  && activeCarts.length) {
      res.send(activeCarts);
    } else {
      throw ({
        error: "Duplicates",
        name: "Carts",
        message: "Active cart not found"
      })
    }
  } catch (error) {
    next(error);
  } 
});

// GET /cars
carsRouter.get("/", async (req, res, next) => {
  try {
    const cars = await getAllCars();
    res.send(cars);
  } catch (error) {
    next(error);
  }
});


// POST /api/cars
carsRouter.post("/", async (req, res, next) => {
  const request = req.body;
  try {
    const existingActivity = await getCarsById(request.id);
    if (!existingActivity) {
      const { manufacturer, model, type, color, price } = await createCar(request);    
      res.send({ manufacturer, model, type, color, price });
    } else {
      throw ({
        error: "Duplicates",
        name: "Activity",
        message: "Car already exists!"
      })
    }
  } catch (error) {
    next(error);
  }
});

// PATCH /cars/:cardId
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
        message: "Administrator required",
      });
    }
  } catch (error) {
    next(error);
  }
});





//Extra Needed?

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

//GET/cars/:manufacturer
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



module.exports = carsRouter;
