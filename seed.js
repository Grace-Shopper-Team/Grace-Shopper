// sync database, seed any dummy data if needed
const db = require('./server/db/db');
const app = require('./server/app');
const port = process.env.PORT || 3000;

// import models for dummy data
// dummy data here

// db sync
// Remember that if you pass the force: true option to sync, that will drop all of your tables before re-creating them. Be sure to never do this in production!

const seed = async () => {
  try {
    await db.sync({ force: true });
    // create models
    // example
    // await Promise.all(
    //    campuses.map((campus) => {
    //     return Campus.create(campus);
    //    })
    //   );
    console.log('Seeding was successful');
    db.close();
  } catch (error) {
    console.error('Something went wrong when seeding database!');
    console.error(error);
    db.close();
  }
};

seed();
