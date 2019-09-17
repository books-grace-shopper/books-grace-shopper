'use strict';

const db = require('../server/db');
const {User, Book, Order, Review} = require('../server/db/models');

async function seed() {
  await db.sync({force: true});
  console.log('db synced!');

  const users = await User.bulkCreate(
    [
      {
        email: 'jimmy@jimmy.com',
        password: '123',
        address: '344 Sunrise Circle',
        name: 'jimmy'
      },
      {
        email: 'bobby@jimmy.com',
        password: '123',
        address: '344 Sunrise Circle',
        name: 'bobby'
      },
      {
        email: 'katie@katie.com',
        password: '456',
        address: '344 Sunrise Circle',
        name: 'katie'
      }
    ],
    {returning: true}
  );

  const books = await Book.bulkCreate(
    [
      {
        title: 'Example 1',
        description: 'Example 1',
        price: 3.72,
        quantity: 5,
        author: 'jim',
        genre: 'fiction'
      },
      {
        title: 'Example 2',
        description: 'Example 2',
        price: 4.72,
        quantity: 2,
        author: 'bill',
        genre: 'sci-fi'
      },
      {
        title: 'Example 3',
        description: 'Example 3',
        price: 43,
        quantity: 1,
        author: 'amy',
        genre: 'biography'
      }
    ],
    {returning: true}
  );
  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
