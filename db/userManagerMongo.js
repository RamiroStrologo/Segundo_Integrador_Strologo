const User = require("./models/user.model");
const CartManager = require("./cartManagerMongo");
const cm = new CartManager();
const { createHash } = require("../utils/bcrypts");

class UserMananger {
  constructor() {
    this.users = [];
  }
  async loginWithGitHub(userData) {
    try {
      const exist = await this.findUser(userData.email);
      if (!exist) {
        const cartId = await fetch("http://localhost:8080/api/cart/newCart", {
          method: "POST",
        });

        const newUser = {
          email: userData.email,
          password: createHash("githubuser"),
          name: userData.name,
          lastname: userData.name,
          age: userData.age,
          role: "user",
          cart: cartId,
        };
        const register = await User.create(newUser);
        delete newUser.password;
        return register ? newUser : false;
      } else {
        delete exist.password;
        return exist;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async findUser(email) {
    try {
      const userFound = await User.findOne({ email: email });
      return userFound ? userFound : false;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}

module.exports = UserMananger;
