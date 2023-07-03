/* eslint-disable no-useless-catch */
const express = require("express");
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { requireUser, requireAdmin } = require("./utils");
const { createUser, 
  getUserByUsername, 
  getUser, 
  getUserById,
  getAllUsers,
  getActiveCartsByUser,
  getAllCartsByUser } = require('../db/db_adaptors');

  
// POST /api/users/register
usersRouter.post('/register', async (req, res, next) => {
  const { username, password, isAdmin } = req.body;
  try {
    const _user = await getUserByUsername(username);
    if (_user) {
      throw ({
        error: "Requirements",
        name: "User",
        message: "Username is already taken. Please choose another!"
      })
    }
    if (password.length < 8) {
      throw ({
        error: "Requirements",
        name: "Password",
        message: "Password must be greater than 8 character!"
      })
    }
    const user = await createUser({
      username: username,
      password: password,
      isAdmin: isAdmin
    })
    const token = jwt.sign({ 
      id: user.id, 
      username
    }, JWT_SECRET)
    res.send({ 
      message: "Thanks for signing up for our service.",
      token,
      user 
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/users/login
usersRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await getUser({ username, password });
    if (user) {
      const token = await jwt.sign({
        id: user.id,
        username
      }, JWT_SECRET);
      const verifiedUser = {
        message: "you're logged in!",
        user,
        token
      }
      res.send(verifiedUser);
    }
  } catch (error) {
    next(error);
  }  
});

// GET /api/users/
usersRouter.get('/', requireUser, requireAdmin, async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');
    if (!auth) {
      res.status(401).send({
        error: "Requirements",
        name: "Login",
        message: UnauthorizedError()
      })
    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
      try {
        const { id } = jwt.verify(token, JWT_SECRET);
        if (id) {
          req.username = await getAllUsers();
          res.send(req.username);
        }
      } catch (error) {
        next(error);
      }
    }
});

// GET /api/users/me
usersRouter.get('/me', requireUser, async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');
    if (!auth) {
      res.status(401).send({
        error: "Requirements",
        name: "Login",
        message: UnauthorizedError()
      })
    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
      try {
        const { id } = jwt.verify(token, JWT_SECRET);
        if (id) {
          req.username = await getUserById(id);
          res.send(req.username);
        }
      } catch (error) {
        next(error);
      }
    }
});

//GET /api/users/:username/allCarts
usersRouter.get('/:username/allCarts', requireUser, async (req, res, next) => {
  const username = req.params.username;
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');
  try {
    if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
      const { id } = jwt.verify(token, JWT_SECRET);
      if (id) {
        const userAllCarts = await getAllCartsByUser({ username });
        res.send(userAllCarts);
      }
    }
  } catch (error) {
    next(error);
  }
});

//GET /api/users/:username/activeCarts
usersRouter.get('/:username/activeCarts', requireUser, async (req, res, next) => {
  const username = req.params.username;
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');
  try {
    if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
      const { id } = jwt.verify(token, JWT_SECRET);
      if (id) {
        const userActiveCarts = await getActiveCartsByUser({ username });
        res.send(userActiveCarts);
      }
    }
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;