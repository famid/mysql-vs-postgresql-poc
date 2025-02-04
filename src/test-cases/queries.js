// Test cases
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

module.exports = { testCases };
