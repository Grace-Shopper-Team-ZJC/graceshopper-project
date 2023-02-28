const { red, green } = require("chalk");
const { faker } = require("@faker-js/faker");
const { db } = require("./index");

// require models
const User = require("./models/User");
const Guest = require("./models/Guest");
const Order = require("./models/Order");
const Product = require("./models/Product");

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
      quantity: faker.random.number({ min: 1, max: 10 }),
      price: faker.commerce.price(),
    };
    cartItems.push(cartItem);
  }
  cartData.push(cartItems);
}

// fake orders
for (let i = 0; i < 20; i++) {
  const order = {
    userId: faker.random.uuid(),
    customerName: faker.name.findName(),
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
