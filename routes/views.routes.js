const { Router } = require("express");
const passport = require("passport");
const route = new Router();

route.get("/login", (req, res) => {
  res.render("login");
});

route.get("/logup", (req, res) => {
  res.render("logup");
});

route.get(
  "/products",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { email, name, role } = req.user;
    res.render("products", { email, name, role });
  }
);
route.get(
  "/cart",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.render("cart");
  }
);

module.exports = route;
