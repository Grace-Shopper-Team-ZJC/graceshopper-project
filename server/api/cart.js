const express = require("express");
const router = express.Router();
const {
  models: { Cart },
} = require("../db");

// GET /api/cart - gets the user's cart
router.get("/", async (req, res, next) => {
  try {
    // Find the user's cart using their user id and include the cart items
    const cart = await Cart.findOne({
      where: { userId: req.user.id },
      include: "items",
    });
    // Respond with the user's cart
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

// POST /api/cart - adds an item to the user's cart by item id
router.post("/", async (req, res, next) => {
  try {
    const { itemId } = req.body;
    // Find the user's cart using their user id
    const cart = await Cart.findOne({ where: { userId: req.user.id } });
    // Add the item with the specified id to the cart
    await cart.addItem(itemId);
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/cart - clears the user's cart
router.delete("/", async (req, res, next) => {
  try {
    // Find the user's cart using their user id
    const cart = await Cart.findOne({ where: { userId: req.user.id } });
    // Clear the cart by removing all cart items
    await cart.clear();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
