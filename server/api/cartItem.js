const express = require("express");
const router = express.Router();
const {
  models: { CartItem },
} = require("../db");

// PUT /api/cartItems/:cartItemId - updates the quantity of a cart item
router.put("/:cartItemId", async (req, res, next) => {
  try {
    // Retrieve the new quantity from the request body
    const { quantity } = req.body;
    // Find the cart item with the given id
    const cartItem = await CartItem.findByPk(req.params.cartItemId);
    // Update the cart item with the new quantity
    await cartItem.update({ quantity });
    // Respond with the updated cart item
    res.json(cartItem);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/cartItems/:cartItemId - removes a cart item from the cart
router.delete("/:cartItemId", async (req, res, next) => {
  try {
    // Find the cart item with the given id
    const cartItem = await CartItem.findByPk(req.params.cartItemId);
    // Delete the cart item from the database
    await cartItem.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
