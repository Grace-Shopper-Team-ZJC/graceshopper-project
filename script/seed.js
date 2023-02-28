// "use strict";

// const {
//   db,
//   models: { User },
// } = require("../server/db");

// /**
//  * seed - this function clears the database, updates tables to
//  *      match the models, and populates the database.
//  */
// async function seed() {
//   await db.sync({ force: true }); // clears db and matches models to tables
//   console.log("db synced!");

//   // Creating Users
//   const users = await Promise.all([
//     User.create({ username: "cody", password: "123" }),
//     User.create({ username: "murphy", password: "123" }),
//   ]);

//   console.log(`seeded ${users.length} users`);
//   console.log(`seeded successfully`);
//   return {
//     users: {
//       cody: users[0],
//       murphy: users[1],
//     },
//   };
// }

// /*
//  We've separated the `seed` function from the `runSeed` function.
//  This way we can isolate the error handling and exit trapping.
//  The `seed` function is concerned only with modifying the database.
// */
// async function runSeed() {
//   console.log("seeding...");
//   try {
//     await seed();
//   } catch (err) {
//     console.error(err);
//     process.exitCode = 1;
//   } finally {
//     console.log("closing db connection");
//     await db.close();
//     console.log("db connection closed");
//   }
// }

// /*
//   Execute the `seed` function, IF we ran this module directly (`node seed`).
//   `Async` functions always return a promise, so we can use `catch` to handle
//   any errors that might occur inside of `seed`.
// */
// if (module === require.main) {
//   runSeed();
// }

// // we export the seed function for testing purposes (see `./seed.spec.js`)
// module.exports = seed;

const { red, green } = require("chalk");
const { faker } = require("@faker-js/faker");
const { db } = require("../server/db/index");

// require models
const User = require("../server/db/models/User");
const Guest = require("../server/db/models/Guest");
const Order = require("../server/db/models/Order");
const Product = require("../server/db/models/Product");

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

// fake guests
for (let i = 0; i < 20; i++) {
  const guest = {
    username: faker.internet.userName(),
    password: faker.internet.password(),
  };
  guestData.push(guest);
}

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

// fake cart items for each guest
for (let i = 0; i < 20; i++) {
  const cartItems = [];
  for (let j = 0; j < 5; j++) {
    const cartItem = {
      quantity: faker.datatype.number({ min: 1, max: 10 }),
      price: faker.commerce.price(),
    };
    cartItems.push(cartItem);
  }
  cartData.push(cartItems);
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
    const users = await Promise.all(
      userData.map((user) => {
        return User.create(user);
      })
    );

    // create Guests and Carts with CartItems for each guest
    const guests = await Promise.all(
      guestData.map(async (guest) => {
        // create a new guest instance and store it in a variable
        const newGuest = await Guest.create(guest);
        // retrieve the array of cart items for the current guest from the cartData array
        const cartItems = cartData[guestData.indexOf(guest)];
        // create a new cart instance for the current guest and store it in a variable
        const cart = await newGuest.createCart();
        // iterate over the array of cart items and create a new cart item instance for each one, associating it with the current cart
        await Promise.all(
          cartItems.map((cartItem) => {
            return cart.createCartItem(cartItem);
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
