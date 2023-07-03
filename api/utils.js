const express = require('express');

function requireUser(req, res, next) {
  if (!req.user) {
    next({
      name: "MissingUserError",
      message: "You must be logged in to perform this action"
    });
  }
  next();
}

function requireAdmin(req, res, next) {
  const user = req.user
  if (!user.isAdmin) {
    next({
      name: "Admin error",
      message: "You must be an administrator to perform this action"
    });
  }
  next();
}


module.exports = {
   requireUser,
   requireAdmin
}
