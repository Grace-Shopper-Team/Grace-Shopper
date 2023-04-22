const db = require('./server/db/db');
const Coffee = require('./server/db/models/Coffee');
const Cart = require('./server/db/models/Cart');
const CartItem = require('./server/db/models/CartItem');
const User = require('./server/db/models/User');
const bcrypt = require('bcrypt');

const coffeeData = [
  {
    name: 'Nicaraguan Jinotega',
    price: 12.49,
    description:
      'Smooth and medium-bodied with a mild acidity. This medium roast coffee has notes of cocoa and caramel.',
    roast: 'Medium',
    origin: 'Nicaragua',
    stock: 42,
  },
  {
    name: 'Honduran Marcala',
    price: 13.99,
    description:
      'Well-rounded and balanced with a medium body. This medium roast coffee has notes of milk chocolate and nuts.',
    roast: 'Medium',
    origin: 'Honduras',
    stock: 36,
  },
  {
    name: 'Papua New Guinea Sigri',
    price: 15.29,
    description:
      'Mild and fruity with a medium body. This medium roast coffee has notes of mango and citrus.',
    roast: 'Medium',
    origin: 'Papua New Guinea',
    stock: 55,
  },
  {
    name: 'Indian Monsooned Malabar',
    price: 14.99,
    description:
      'Low acidity and full-bodied. This dark roast coffee has notes of dark chocolate and spice.',
    roast: 'Dark',
    origin: 'India',
    stock: 34,
  },
  {
    name: 'Jamaican Blue Mountain',
    price: 49.99,
    description:
      'Smooth and well-balanced with a medium body. This medium roast coffee has notes of chocolate, mild fruit, and floral undertones.',
    roast: 'Medium',
    origin: 'Jamaica',
    stock: 20,
  },
  {
    name: 'Panamanian Boquete',
    price: 16.49,
    description:
      'Bright and fruity with a medium body. This medium roast coffee has notes of red fruit and milk chocolate.',
    roast: 'Medium',
    origin: 'Panama',
    stock: 38,
  },
  {
    name: 'Bolivian Yungas Valley',
    price: 13.49,
    description:
      'Mild and sweet with a medium body. This medium roast coffee has notes of chocolate, nuts, and fruit.',
    roast: 'Medium',
    origin: 'Bolivia',
    stock: 47,
  },
  {
    name: 'Zimbabwe Chipinge',
    price: 15.99,
    description:
      'Bright and fruity with a medium body. This medium roast coffee has notes of blackcurrant, lemon, and dark chocolate.',
    roast: 'Medium',
    origin: 'Zimbabwe',
    stock: 30,
  },
  {
    name: 'Hawaiian Kona',
    price: 34.99,
    description:
      'Smooth and well-rounded with a medium body. This medium roast coffee has notes of milk chocolate, caramel, and a hint of fruit.',
    roast: 'Medium',
    origin: 'Hawaii, USA',
    stock: 25,
  },
  {
    name: 'Ecuadorian Loja',
    price: 14.49,
    description:
      'Bright and fruity with a medium body. This medium roast coffee has notes of red fruit, floral undertones, and a wine-like acidity.',
    roast: 'Medium',
    origin: 'Ecuador',
    stock: 40,
  },
  {
    name: 'Ethiopian Yirgacheffe',
    price: 15.99,
    description:
      'Bright, fruity, and aromatic. A light roast coffee with notes of citrus and floral undertones.',
    imageUrl:
      'https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2237&q=80',
    roast: 'Light',
    origin: 'Ethiopia',
    stock: 50,
  },
  {
    name: 'Colombian Supremo',
    price: 12.99,
    description:
      'Smooth and balanced with a medium body. A medium roast coffee with notes of chocolate and nuts.',
    imageUrl:
      'https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2237&q=80',
    roast: 'Medium',
    origin: 'Colombia',
    stock: 60,
  },
  {
    name: 'Brazilian Santos',
    price: 11.99,
    description:
      'Mild and sweet with a medium body. A medium roast coffee with notes of chocolate and a smooth finish.',
    imageUrl:
      'https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2237&q=80',
    roast: 'Medium',
    origin: 'Brazil',
    stock: 40,
  },
  {
    name: 'Sumatra Mandheling',
    price: 14.99,
    description:
      'Full-bodied and rich. A dark roast coffee with earthy and spicy notes, and a bold finish.',
    imageUrl:
      'https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2237&q=80',
    roast: 'Dark',
    origin: 'Indonesia',
    stock: 30,
  },
  {
    name: 'Guatemalan Antigua',
    price: 13.99,
    description:
      'Smooth and well-rounded. A medium roast coffee with notes of chocolate, caramel, and a hint of fruit.',
    imageUrl:
      'https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2237&q=80',
    roast: 'Medium',
    origin: 'Guatemala',
    stock: 45,
  },
  {
    name: 'Kenyan AA',
    price: 16.99,
    description:
      'Complex and vibrant. A medium roast coffee with bright acidity and notes of blackcurrant and citrus.',
    imageUrl:
      'https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2237&q=80',
    roast: 'Medium',
    origin: 'Kenya',
    stock: 55,
  },
  {
    name: 'Tanzanian Peaberry',
    price: 15.49,
    description:
      'Lively and fruity. A medium roast coffee with a medium body and notes of blackberry and dark chocolate.',
    imageUrl:
      'https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2237&q=80',
    roast: 'Medium',
    origin: 'Tanzania',
    stock: 35,
  },
  {
    name: 'Costa Rican Tarrazu',
    price: 13.49,
    description:
      'Bright and balanced. A medium roast coffee with crisp acidity and notes of red fruit and milk chocolate.',
    imageUrl:
      'https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2237&q=80',
    roast: 'Medium',
    origin: 'Costa Rica',
    stock: 60,
  },
  {
    name: 'Mexican Chiapas',
    price: 12.49,
    description:
      'Smooth and nutty. A medium roast coffee with a medium body and notes of almond and cocoa.',
    imageUrl:
      'https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2237&q=80',
    roast: 'Medium',
    origin: 'Mexico',
    stock: 50,
  },
  {
    name: 'Peruvian Chanchamayo',
    price: 14.29,
    description:
      'Mild and clean. A medium roast coffee with a medium body and notes of chocolate, nuts, and fruit.',
    imageUrl:
      'https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2237&q=80',
    roast: 'Medium',
    origin: 'Peru',
    stock: 45,
  },
];

const users = [
  {
    username: 'user1',
    password: 'password1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'user1@example.com',
    isAdmin: false,
  },
  {
    username: 'user2',
    password: 'password2',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'user2@example.com',
    isAdmin: false,
  },
  {
    username: 'admin1',
    password: '123',
    firstName: 'Admin',
    lastName: 'Admin',
    email: 'admin@example.com',
    isAdmin: true,
  },
];

<<<<<<< HEAD
users.forEach(user => {
  const saltRounds = 10;
  bcrypt.hash(user.password, saltRounds, function(err, hash) {
=======
users.forEach((user) => {
  const saltRounds = 10;
  bcrypt.hash(user.password, saltRounds, function (err, hash) {
>>>>>>> combined auth logic with current updates
    if (err) {
      console.error(err);
    } else {
      user.password = hash;
    }
  });
});

const carts = [{ userId: 1 }, { userId: 2 }];

const cartItems = [
  { cartId: 1, productId: 1, quantity: 2 },
  { cartId: 1, productId: 2, quantity: 1 },
  { cartId: 2, productId: 3, quantity: 3 },
  { cartId: 2, productId: 4, quantity: 1 },
];

const seed = async () => {
  try {
    await db.sync({ force: true });

    await Promise.all(users.map((user) => User.create(user)));
    await Promise.all(carts.map((cart) => Cart.create(cart)));
    await Promise.all(coffeeData.map((coffee) => Coffee.create(coffee)));
    await Promise.all(cartItems.map((cartItem) => CartItem.create(cartItem)));

    console.log('Seeding was successful');
    db.close();
  } catch (error) {
    console.error('Something went wrong when seeding database!');
    console.error(error);
    db.close();
  }
};

seed();
