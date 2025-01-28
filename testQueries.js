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
