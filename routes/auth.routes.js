const express = require("express");
const { Router } = express;
const route = new Router();
const passport = require("passport");
const { tokenGenerator } = require("../utils/generateToken.js");

//RUTAS DE LOGIN
route.get(
  "/loginWithGitHub",
  passport.authenticate("login_github", {
    session: false,
  }),
  (req, res) => {}
);

route.get(
  "/login_github",
  passport.authenticate("login_github", {
    session: false,
  }),
  (req, res) => {
    let token = tokenGenerator(req.user);
    console.log(token);
    res.cookie("cookieToken", token, { httpOnly: true });
    res.redirect("/views/products");
  }
);

//CERRAR SESIÓN
route.get("/logout", (req, res) => {
  res.clearCookie("cookieToken").redirect("/views/login");
});

module.exports = route;
