const mongoose = require("mongoose");

module.exports = {
  connect: () => {
    return mongoose
      .connect(
        "mongodb+srv://ramirostrologo:r131217s@proyectocoder.annbnga.mongodb.net/ecommerce_preentrega-dos"
      )
      .then(() => {
        console.log("bd connected");
      })
      .catch((err) => {
        console.log("bd connection failed", err);
      });
  },
};
