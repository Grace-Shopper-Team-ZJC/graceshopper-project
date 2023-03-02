const router = require("express").Router();
const {
  models: { User, Order, Product },
} = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    console.log(users);
    res.json(users);
  } catch (err) {
    console.log(err);
    next(err);
  }
});
/////////placeholder routes ////////////////////
//Reminder: these are placeholders route. Sequelize commands may need adjustments

////users//////////

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, { include: [Order] });
    console.log(user);
    res.json(user);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
