// const { Sequelize } = require('sequelize'); // Import Sequelize
// const {
//   UserPostgres,
//   ProductPostgres,
//   OrderPostgres,
// } = require('./postgresql-models');
// const {
//   UserMySQL,
//   ProductMySQL,
//   OrderMySQL,
// } = require('./mysql-models.js');

// const testJoins = async () => {
//   console.log('Testing complex query with joins and aggregations...');
//   try {
//     console.time('PostgreSQL');
//     const postgresResult = await OrderPostgres.findAll({
//       attributes: [
//         'userId',
//         [Sequelize.fn('SUM', Sequelize.literal('quantity * price')), 'total_spent'], // Use Sequelize.literal for "quantity * price"
//       ],
//       include: [{ model: ProductPostgres, attributes: [] }],
//       group: ['userId'],
//       order: [[Sequelize.literal('total_spent'), 'DESC']],
//       limit: 10,
//     });
//     console.timeEnd('PostgreSQL');

//     console.time('MySQL');
//     const mysqlResult = await OrderMySQL.findAll({
//       attributes: [
//         'userId',
//         [Sequelize.fn('SUM', Sequelize.literal('quantity * price')), 'total_spent'], // Use Sequelize.literal here as well
//       ],
//       include: [{ model: ProductMySQL, attributes: [] }],
//       group: ['userId'],
//       order: [[Sequelize.literal('total_spent'), 'DESC']],
//       limit: 10,
//     });
//     console.timeEnd('MySQL');
//   } catch (error) {
//     console.error('Error testing joins:', error);
//   } finally {
//     process.exit();
//   }
// };

// testJoins();

const { postgresDb, mysqlDb } = require('./db');

const testJoinsWithRawQuery = async () => {
  console.log('Testing complex query with joins and aggregations (raw queries)...');

  // Define queries for PostgreSQL and MySQL
  const postgresQuery = `
    SELECT 
      o."userId", 
      SUM(o.quantity * p.price) AS total_spent
    FROM 
      "Orders" o
    JOIN 
      "Products" p ON o."productId" = p.id
    GROUP BY 
      o."userId"
    ORDER BY 
      total_spent DESC
    LIMIT 1000;
  `;
//   const postgresQuery = `
//   SELECT * FROM "Orders";
// `;

  const mysqlQuery = `
    EXPLAIN FORMAT=JSON
    SELECT 
      o.\`userId\`, 
      SUM(o.quantity * p.price) AS total_spent
    FROM 
      \`Orders\` o
    JOIN 
      \`Products\` p ON o.\`productId\` = p.id
    GROUP BY 
      o.\`userId\`
    ORDER BY 
      total_spent DESC
    LIMIT 1000;
  `;

//   const mysqlQuery = `
//   SELECT * FROM \`Orders\`;
// `;

  try {
    // PostgreSQL
    console.time('PostgreSQL');
    const postgresResult = await postgresDb.query(postgresQuery, { type: postgresDb.QueryTypes.SELECT });
    console.timeEnd('PostgreSQL');
    // console.log('PostgreSQL Result:', postgresResult);

    // MySQL
    console.time('MySQL');
    const mysqlResult = await mysqlDb.query(mysqlQuery, { type: mysqlDb.QueryTypes.SELECT });
    console.timeEnd('MySQL');
    // console.log('MySQL Result:', mysqlResult);
  } catch (error) {
    console.error('Error testing joins with raw queries:', error);
  } finally {
    process.exit();
  }
};

testJoinsWithRawQuery();
