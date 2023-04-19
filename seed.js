const db = require('./server/db/db');
const app = require('./server/app');
const port = process.env.PORT || 3000;
const User = require('./server/db/models/User');

const users = [
  {
    username: 'user1',
    password: 'password1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'user1@example.com',
  },
  {
    username: 'user2',
    password: 'password2',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'user2@example.com',
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true });

    await Promise.all(users.map((user) => User.create(user)));

    console.log('Seeding was successful');
    db.close();
  } catch (error) {
    console.error('Something went wrong when seeding database!');
    console.error(error);
    db.close();
  }
};

seed();