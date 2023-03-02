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
const CTable = require("../server/db/models/CheckoutTable");

//fake code below/////////////
/* 
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
// creating 20 fake cart with 5 items per cart
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
} */

const seed = async () => {
  try {
    // Sync the database and delete any existing data
    await db.sync({ force: true });

    const billy = await User.create({
      username: "billy1234",
      password: "password123",
    });
    const lisa = await User.create({
      username: "lisalisa",
      password: "123pwpw",
    });
    const davis = await User.create({
      username: "davis1999",
      password: "1999pass",
    });

    const guest1 = await Guest.create();
    const guest2 = await Guest.create();

    const bananas = await Product.create({
      name: "Bananas",
      description: "It's bananas.",
      price: 2.99,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg",
      quantity: 11,
    });

    const apples = await Product.create({
      name: "Apple",
      description: "it's an apple",
      price: 3.45,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Apple-003.jpg/576px-Apple-003.jpg",
      quantity: 5,
    });

    const oranges = await Product.create({
      name: "Orange",
      description: "it's an orange.",
      price: 2.22,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Orange-Fruit-Pieces.jpg/800px-Orange-Fruit-Pieces.jpg",
      quantity: 3,
    });

    const item1 = await CTable.create({ desiredQuantity: 2 });
    const item2 = await CTable.create({ desiredQuantity: 1 });

    await item1.setProduct(apples);
    await item2.setProduct(oranges);

    const cart1 = await Cart.create();
    const cart2 = await Cart.create();
    const cart3 = await Cart.create();

    await billy.setCart(cart1);
    await guest1.setCart(cart2);
    await guest2.setCart(cart3);

    await item1.setCart(cart1);
    await item2.setCart(cart3);

    //await cart1.setCheckoutTable(item1);

    const order1 = await Order.create({
      customerName: "Bob Billy Bob",
      customerEmail: "billy@email.com",
      shippingAddress: "123 Fake Street",
    });
    const order2 = await Order.create({
      customerName: "Lucy Jones",
      customerEmail: "lucy@email.com",
      shippingAddress: "555 McFaker Drive",
    });

    await order1.setUser(billy);
    await order2.setUser(lisa);
    await cart1.setOrder(order1);

    //faker code below////////
    /* 
    // create users
    await Promise.all(
      userData.map((user) => {
        return User.create(user);
      })
    );

    // create Guests and Carts with CartItems for each guest
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
 */
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
