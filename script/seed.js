"use strict";

const { red, green } = require("chalk");
const { faker } = require("@faker-js/faker");
const { db } = require("../server/db/index");

// require models
const User = require("../server/db/models/User");
const Guest = require("../server/db/models/Guest");
const Order = require("../server/db/models/Order");
const Product = require("../server/db/models/Product");
const Cart = require("../server/db/models/Cart");

// generate fake data
const userData = [];
const guestData = [];
const orderData = [];
const cartData = [];
const productData = [];

// fake users
for (let i = 0; i < 20; i++) {
  const user = {
    username: faker.internet.userName(),
    password: faker.internet.password(),
  };
  userData.push(user);
}
console.log("Users created:", userData);

// fake guests
for (let i = 0; i < 20; i++) {
  const guest = {
    createdAt: new Date(),
  };
  guestData.push(guest);
}
console.log("Guests created:", guestData);

// fake products
for (let i = 0; i < 20; i++) {
  const product = {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    image: faker.image.imageUrl(200, 300),
  };
  productData.push(product);
}

// fake cart items for each cart
for (let i = 0; i < 20; i++) {
  const cartItems = [];
  for (let j = 0; j < 5; j++) {
    const cartItem = {
      quantity: faker.datatype.number({ min: 1, max: 10 }),
      price: faker.commerce.price(),
      productId: faker.datatype.uuid(),
    };
    cartItems.push(cartItem);
  }
  // initialize an object in cartData[i] with the cartItems property
  cartData[i] = { cartItems };
}

// fake orders
for (let i = 0; i < 20; i++) {
  const order = {
    userId: faker.datatype.uuid(),
    customerName: faker.name.fullName(),
    customerEmail: faker.internet.email(),
    shippingAddress: faker.address.streetAddress(),
    orderDate: faker.date.past(),
  };
  orderData.push(order);
}

const seed = async () => {
  try {
    // Sync the database and delete any existing data
    await db.sync({ force: true });

    // create users
    await Promise.all(
      userData.map((user) => {
        return User.create(user);
      })
    );

    // create Guests and Carts with CartItems for each guest
    // create guests and carts for each guest
    await Promise.all(
      guestData.map(async (guest) => {
        // create a new guest instance and store it in a variable
        const newGuest = await Guest.create(guest);
        // create a new cart instance for the current guest and store it in a variable
        const cart = await Cart.create({});
        // associate the cart with the guest
        await newGuest.setCart(cart);
        // retrieve the array of cart items for the current cart from the cartData array
        const cartItems = cartData[guestData.indexOf(guest)].cartItems;
        // iterate over the array of cart items and create a new cart item instance for each one, associating it with the current cart
        await Promise.all(
          cartItems.map((cartItem) => {
            return cart.createProduct(cartItem);
          })
        );
        // return the newly created guest instance
        return newGuest;
      })
    );

    // create products
    const products = await Promise.all(
      productData.map((product) => {
        return Product.create(product);
      })
    );

    // seed successful
    console.log(green("Seeding success!"));
    db.close();
  } catch (err) {
    // seed unsuccessful
    console.error(red("Oh noes! Something went wrong!"));
    console.error(err);
    db.close();
  }
};

// wrapper function that is checking if seed() is working
async function runSeed() {
  try {
    await seed();
  } catch (err) {
    console.error(err);
  } finally {
    db.close();
  }
}

// checks if this module is being run directly by Node.js
if (require.main === module) {
  runSeed();
}
