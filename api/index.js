const apiRouter = require('express').Router();
const jwt = require('jsonwebtoken');
// const usersRouter = require('./users');
// const carsRouter = require('./activities');
// const listingsRouter = require('./routines');
const carListingsRouter = require('./carListings');
const { JWT_SECRET } = process.env;


apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');
  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    try {
      const { id } = jwt.verify(token, JWT_SECRET);
      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${ prefix }`
    });
  }
});

// apiRouter.use((req, res, next) => {
//   if (req.user) {
//     console.log("User is set:", req.user);
//   }
//   next();
// });

apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

apiRouter.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});


//* Place your routers here
// apiRouter.use('/users', usersRouter);
// apiRouter.use('/cars', carsRouter);
// apiRouter.use('/listings', listingsRouter);
apiRouter.use('/carListings', carListingsRouter);

//* 404 Handler (Non-Exiting Routes)
apiRouter.get('*', (req, res) => {
  res.status(404).send({ message: "Error, can not find that page" });
});

//* Error Handler
apiRouter.use((error, req, res, next) => {
  if (error.statusCode) {
    res.status(error.statusCode).send({
      error: error.error,
      name: error.name,
      message: error.message    
    });
  } else {
    res.send({
      error: error.error,
      name: error.name,
      message: error.message    
    });
  }
  next();
});


module.exports = apiRouter;
