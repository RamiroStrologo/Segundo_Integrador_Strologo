const Products = require("../db/models/products.model");

class ProductManager {
  constructor() {
    this.products = [];
  }

  async getProducts(querys) {
    try {
      let response = await Products.paginate(
        querys.category ? { category: querys.category } : {},
        {
          limit: querys.limit ? querys.limit : 10,
          sort: querys.sort ? { price: querys.sort } : null,
          page: querys.page ? querys.page : 1,
        }
      );
      return response;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async addProduct(newProduct) {
    try {
      this.products = newProduct;
      await Products.create(this.products);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async delProduct(id) {
    try {
      await Products.deleteOne({ _id: id });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
  async updateProduct(id, update) {
    try {
      await Products.updateOne({ _id: id }, update);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}

module.exports = ProductManager;
