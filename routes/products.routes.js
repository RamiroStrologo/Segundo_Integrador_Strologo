const { Router } = require("express");
const ProductManager = require("../db/productManagerMongo");
const route = new Router();
const pm = new ProductManager();

route.get("/", async (req, res) => {
  try {
    let { category, limit, sort, page } = req.query;
    let querys = {
      category: category,
      limit: limit,
      sort: parseInt(sort),
      page: page,
    };
    let response = await pm.getProducts(querys);
    if (response != false && response.docs.length > 0) {
      res.status(200).send({
        msg: "Productos obtenidos con exito",
        data: response,
      });
    } else if (response.docs.length < 1) {
      res
        .status(404)
        .send({ msg: "No hay productos para los criterios seleccionados" });
    } else {
      res.status(404).send({
        msg: "Productos no encontrados",
      });
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = route;
