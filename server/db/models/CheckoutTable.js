const Sequelize = require("sequelize");
const db = require("../db");


const CheckoutTable = db.define("CheckoutTable", {
    desiredQuantity: {
      type: Sequelize.INTEGER,
    },
  });
  
module.exports = CheckoutTable;