const { postgresDb, mysqlDb } = require('./db');

const testCases = [
    {
      name: 'Simple Query',
      postgresQuery: 'SELECT * FROM "Orders";',
      mysqlQuery: 'SELECT * FROM `Orders`;',
    },
    {
      name: 'Aggregation Query',
      postgresQuery: `
        SELECT SUM(quantity * price) AS total_spent 
        FROM "Orders" o 
        JOIN "Products" p ON o."productId" = p.id;
      `,
      mysqlQuery: `
        SELECT SUM(quantity * price) AS total_spent 
        FROM \`Orders\` o 
        JOIN \`Products\` p ON o.\`productId\` = p.id;
      `,
    },
    {
      name: 'Filtering Query',
      postgresQuery: 'SELECT * FROM "Orders" WHERE quantity > 5;',
      mysqlQuery: 'SELECT * FROM `Orders` WHERE quantity > 5;',
    },
    {
        name: 'JSON Query',
        postgresQuery: `
          SELECT * FROM "Products" ORDER BY CAST(metadata->>'stock' AS INTEGER) DESC;
        `,
        mysqlQuery: `
          SELECT * FROM \`Products\` 
          ORDER BY JSON_UNQUOTE(JSON_EXTRACT(metadata, '$.stock')) DESC;
        `,
      },
    {
      name: 'Complex Join',
      postgresQuery: `
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
      `,
      mysqlQuery: `
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
      `,
    },
  ];
  
  const runTests = async () => {
    const results = [];
  
    for (const testCase of testCases) {
      console.log(`Running test: ${testCase.name}`);
  
      // Measure PostgreSQL performance
      console.time(`PostgreSQL (${testCase.name})`);
      const postgresStart = performance.now(); // Start time for PostgreSQL
      await postgresDb.query(testCase.postgresQuery, { type: postgresDb.QueryTypes.SELECT });
      const postgresEnd = performance.now(); // End time for PostgreSQL
      const postgresTime = postgresEnd - postgresStart; // Calculate execution time
      console.timeEnd(`PostgreSQL (${testCase.name})`);
      console.log(`++++++++++++PostgreSQL+++++++++++++++++++++`);
  
      // Measure MySQL performance
      console.time(`MySQL (${testCase.name})`);
      const mysqlStart = performance.now(); // Start time for MySQL
      await mysqlDb.query(testCase.mysqlQuery, { type: mysqlDb.QueryTypes.SELECT });
      const mysqlEnd = performance.now(); // End time for MySQL
      const mysqlTime = mysqlEnd - mysqlStart; // Calculate execution time
      console.timeEnd(`MySQL (${testCase.name})`);
  
      results.push({
        name: testCase.name,
        postgresTime: postgresTime,
        mysqlTime: mysqlTime,
      });
      console.log(`==================${testCase.name}===============================\n`);
    }
  
    console.log('Results:', results);
  };
  
  runTests();
  