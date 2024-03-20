const Cart = require("./models/carts.model");

class CartManager {
  constructor() {
    this.cart = [];
  }

  async addCart() {
    try {
      const createdCart = await Cart.create({ products: [] });

      return createdCart._id;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async getCartById(id) {
    try {
      this.cart = Cart.findOne({ _id: id });
      return this.cart;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async delAllProdFromCart(cid) {
    try {
      let res = await Cart.updateOne({ _id: cid }, { $set: { products: [] } });
      return res;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
  async delProdById(cid, pid) {
    try {
      let cart = await Cart.findOne({ _id: cid });
      console.log(cart.products.length);
      if (cart) {
        cart.products = cart.products.filter(
          (prod) => prod.product._id.toString() !== pid
        );
        console.log(cart.products.length);
        await cart.save();
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async addProdToCart(cId, pId) {
    try {
      console.log(cId);
      const cart = await Cart.findOne({ _id: cId });
      console.log(cart);
      if (cart) {
        cart.products.push({ product: pId });
        await cart.save();
        return true;
      } else return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}

module.exports = CartManager;
