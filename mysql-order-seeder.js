const { faker } = require('@faker-js/faker');
const {
  UserMySQL,
  ProductMySQL,
  OrderMySQL,
} = require('./mysql-models.js');
const { mysqlDb } = require('./db');

// Helper function to chunk the data
const chunkArray = (array, size) => 
  Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  );

const seedData = async () => {
  await mysqlDb.sync({ force: true });

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
    console.log(`Inserting ${orders.length} orders in chunks of ${chunkSize}...`);
    await UserMySQL.bulkCreate(users);
    await ProductMySQL.bulkCreate(products);

    // Loop through and insert each chunk
    for (const [index, chunk] of chunks.entries()) {
      await OrderMySQL.bulkCreate(chunk);
      console.log(`Inserted chunk ${index + 1}/${chunks.length}`);
    }

    console.log('Seeded MySQL database successfully.');
  } catch (error) {
    console.error('Error seeding data:', error.message);
  } finally {
    process.exit();
  }
};

seedData();
