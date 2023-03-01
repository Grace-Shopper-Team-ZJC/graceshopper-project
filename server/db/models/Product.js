const Sequelize = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 5;

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
  },
  image: {
    type: Sequelize.STRING,
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Product;
