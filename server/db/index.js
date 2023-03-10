//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Guest = require("./models/Guest");
const Order = require("./models/Order");
const Product = require("./models/Product");
const Cart = require("./models/Cart");
const CartItem = require("./models/CartItem");

//associations could go here!
User.hasMany(Order);
Order.belongsTo(User);

User.hasOne(Cart);
Cart.belongsTo(User);

Guest.hasOne(Cart);
Cart.belongsTo(Guest);

Product.hasMany(CartItem);
CartItem.belongsTo(Product);

Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);

///
Order.hasMany(Cart);
Cart.belongsTo(Order);

module.exports = {
  db,
  models: {
    User,
    Guest,
    Order,
    Product,
    Cart,
    CartItem,
  },
};
