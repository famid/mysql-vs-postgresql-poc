const { faker } = require('@faker-js/faker');
const {
  UserPostgres,
  ProductPostgres,
  OrderPostgres,
} = require('./postgresql-models');
const {
    UserMySQL,
    ProductMySQL,
    OrderMySQL,
  } = require('./mysql-models.js');
const { postgresDb, mysqlDb } = require('./db');

// Helper function to chunk the data
const chunkArray = (array, size) => 
  Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  );

const seedData = async () => {
    const users = Array.from({ length: 1000 }, () => ({
      name: faker.person.fullName(), // Updated method
      email: faker.internet.email(),
      age: faker.number.int({ min: 18, max: 65 }),
    }));
  
    const products = Array.from({ length: 10000 }, () => ({
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price()),
      metadata: {
        brand: faker.company.name(), // Updated method
        stock: faker.number.int({ min: 0, max: 1000 }),
        category: faker.commerce.department(),
      },
    }));
  
    const orders = Array.from({ length: 1000000 }, () => ({
      userId: faker.number.int({ min: 1, max: 1000 }),
      productId: faker.number.int({ min: 1, max: 10000 }),
      quantity: faker.number.int({ min: 1, max: 10 }),
      orderDate: faker.date.recent({ days: 365 }),
    }));

    const chunkSize = 10000; // Insert 10,000 records at a time
    const chunks = chunkArray(orders, chunkSize);
  
    try {
      // Sync and seed PostgreSQL
      await postgresDb.sync({ force: true });
      await UserPostgres.bulkCreate(users);
      await ProductPostgres.bulkCreate(products);
      await OrderPostgres.bulkCreate(orders);
      console.log('Seeded PostgreSQL database.');
  
      // Sync and seed MySQL
      await mysqlDb.sync({ force: true });
      await UserMySQL.bulkCreate(users);
      await ProductMySQL.bulkCreate(products);
       // Loop through and insert each chunk
    for (const [index, chunk] of chunks.entries()) {
      await OrderMySQL.bulkCreate(chunk);
      console.log(`Inserted chunk ${index + 1}/${chunks.length}`);
    }
      console.log('Seeded MySQL database.');
    } catch (error) {
      console.error('Error seeding data:', error);
    } finally {
      process.exit();
    }
  };
  
  seedData();
