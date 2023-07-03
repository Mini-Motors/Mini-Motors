const express = require("express");
const carsRouter = express.Router();
const { requireUser, requireAdmin } = require("./utils");
const {
  getAllCars,
  getCarsByManufacturer,
  getCarsByModel,
  getCarsByType,
  getCarsByColor,
  getCarsById,
  updateCar,
  getActiveCartsByCarId,
  createCar,
  destroyCar } = require("../db/db_adaptors");


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

// GET /api/cars
carsRouter.get("/", async (req, res, next) => {
  try {
    const cars = await getAllCars();
    res.send(cars);
  } catch (error) {
    next(error);
  }
});

// POST /api/cars
carsRouter.post("/", requireUser, requireAdmin, async (req, res, next) => {
  const request = req.body;
  try {
    const existingCar = await getCarsById(request.id);
    if (!existingCar) {
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

// PATCH /api/cars/:carId
carsRouter.patch("/:carId", requireUser, requireAdmin, async (req, res, next) => {
  const user = req.user;
  const { carId } = req.params;
  const updateFields = {};
  const { manufacturer, model, type, color, price } = req.body;

  if (manufacturer) {
    updateFields.manufacturer = manufacturer;
  }

  if (model) {
    updateFields.id = carId,
    updateFields.model = model
  }

  if (type) {
    updateFields.id = carId,
    updateFields.type = type
  }

  if (color) {
    updateFields.id = carId,
    updateFields.color = color
  }

  if (price) {
    updateFields.id = carId,
    updateFields.price = price
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

    console.log(user)
    if (user.isAdmin === true) {
      const updatedCar = await updateCar(updateFields);
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

// DELETE /api/cars/:carId
carsRouter.delete('/:carId', requireUser, requireAdmin, async (req, res, next) => {
  const { carId } = req.params;
  try {
    const car = await getCarsById(carId);
    await destroyCar(carId);
    res.send(car);
  } catch (error) {
    next(error);
  }
});


//! Extra Needed?
// GET /api/cars/:id
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

//GET /api/cars/:manufacturer
carsRouter.get("/:manufacturer", async (req, res, next) => {
  const { manufacturer } = req.params;
  try {
    const cars = await getCarsByManufacturer(manufacturer);
    res.send(cars);
  } catch (error) {
    next(error);
  }
});

// GET /api/cars/:model
carsRouter.get("/:model", async (req, res, next) => {
  const { model } = req.params;
  try {
    const cars = await getCarsByModel(model);
    res.send(cars);
  } catch (error) {
    next(error);
  }
});

// GET /api/cars/:type
carsRouter.get("/:type", async (req, res, next) => {
  const { type } = req.params;
  try {
    const cars = await getCarsByType(type);
    res.send(cars);
  } catch (error) {
    next(error);
  }
});

// GET /api/cars/:color
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
