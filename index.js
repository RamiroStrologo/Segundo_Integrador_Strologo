const express = require("express");
const { initializePassport } = require("./config/passport");
const cookieParser = require("cookie-parser");
const handlebars = require("express-handlebars");
const DataBase = require("./db/index");
const passport = require("passport");
const viewRoutes = require("./routes/views.routes");
const cartRoutes = require("./routes/cart.routes");
const productsRoutes = require("./routes/products.routes");
const authRoutes = require("./routes/auth.routes");
const sessionRoutes = require("./routes/session.routes");
const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
initializePassport();
app.use(passport.initialize());

app.use("/views", viewRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/session", sessionRoutes);
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

app.listen(PORT, () => {
  console.log(`Server run ok on port ${PORT}`);
  DataBase.connect();
});
