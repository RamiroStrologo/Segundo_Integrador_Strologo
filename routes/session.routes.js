const express = require("express");
const { Router } = express;
const route = new Router();
const passport = require("passport");

// PASAR LOS DATOS DEL JWT AL FRONT
route.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(req.user);
  }
);

module.exports = route;
