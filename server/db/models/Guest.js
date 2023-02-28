const Sequelize = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 5;

const Guest = db.define("guest", {
  createdAt: {
    type: Sequelize.DATE,
  },
});

module.exports = Guest;
