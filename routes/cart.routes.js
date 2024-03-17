const { Router } = require("express");
const route = new Router();
const CartManager = require("../db/cartManagerMongo");
const cm = new CartManager();

//CREA UN CARRITO
route.post("/newCart", (req, res) => {
  try {
    const cartId = cm.addCart();
    res.send({ data: cartId });
  } catch (err) {
    console.error(err);
    return false;
  }
});

//OBTIENE LOS PRODUCTOS DE UN CARRITO
route.get("/:cid", async (req, res) => {
  try {
    let cid = req.params.cid;
    let response = await cm.getCartById(cid);
    if (response) {
      res.status(201).send({
        msg: `Carrito encontrado con éxito`,
        data: response,
      });
    } else {
      res.status(400).send({
        msg: `Carrito no encontrado`,
      });
    }
  } catch (err) {
    console.error(err);
  }
});

//AGREGA PRODUCTOS AL CARRITO
route.put("/addProdToCart/:cId/:pId", async (req, res) => {
  try {
    let cId = req.params.cId;
    let pId = req.params.pId;
    let response = await cm.addProdToCart(cId, pId);
    if (response) {
      res.status(201).send({
        msg: `Producto agregado con éxito al carrito`,
      });
    } else {
      res.status(404).send({
        msg: `Carrito ${cId} no encontrado`,
      });
    }
  } catch (err) {
    console.error(err);
  }
});
//ELIMINA UN PRODUCTO DEL CARRITO POR SU ID
route.delete("/:cid/products/:pid", async (req, res) => {
  try {
    let cid = req.params.cid;
    let pid = req.params.pid;
    let response = await cm.delProdById(cid, pid);
    if (response) {
      res.status(201).send({
        msg: `Producto eliminado con éxito`,
      });
    } else {
      res.status(404).send({
        msg: `Carrito ${cid} no encontrado o producto no existe`,
      });
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = route;
