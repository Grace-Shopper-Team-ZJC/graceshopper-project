const Sequelize = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 5;

const Order = db.define("order", {
  customerName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  customerEmail: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  shippingAddress: {
    type: Sequelize.STRING,
  },
  orderDate: {
    type: Sequelize.STRING,
  },
});

module.exports = Order;
