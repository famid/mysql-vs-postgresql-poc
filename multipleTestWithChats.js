const { postgresDb, mysqlDb } = require('./db');
const QuickChart = require('quickchart-js');

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

// Run tests and generate the graph
const runTests = async () => {
  const results = [];

  for (const testCase of testCases) {
    console.log(`Running test: ${testCase.name}`);

    // Measure PostgreSQL performance
    const postgresStart = performance.now();
    await postgresDb.query(testCase.postgresQuery, { type: postgresDb.QueryTypes.SELECT });
    const postgresEnd = performance.now();
    const postgresTime = postgresEnd - postgresStart;
    console.timeEnd(`PostgreSQL (${testCase.name})`);

    console.log(`++++++++++++PostgreSQL+++++++++++++++++++++`);

    // Measure MySQL performance
    const mysqlStart = performance.now();
    await mysqlDb.query(testCase.mysqlQuery, { type: mysqlDb.QueryTypes.SELECT });
    const mysqlEnd = performance.now();
    const mysqlTime = mysqlEnd - mysqlStart;
    console.timeEnd(`MySQL (${testCase.name})`);

    results.push({
      name: testCase.name,
      postgresTime: postgresTime,
      mysqlTime: mysqlTime,
    });

    console.log(`==================${testCase.name}===============================\n`);
  }

  console.log('Results:', results);

  // Generate and display the chart
  generateChart(results);
};

// Generate a bar chart
const generateChart = (results) => {
  const chart = new QuickChart();
  chart.setWidth(800);
  chart.setHeight(400);
  chart.setBackgroundColor('white');

  // Extract data for the chart
  const labels = results.map((result) => result.name);
  const postgresData = results.map((result) => result.postgresTime);
  const mysqlData = results.map((result) => result.mysqlTime);

  // Configure the chart
  chart.setConfig({
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'PostgreSQL',
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          data: postgresData,
        },
        {
          label: 'MySQL',
          backgroundColor: 'rgba(255, 159, 64, 0.6)',
          borderColor: 'rgba(255, 159, 64, 1)',
          data: mysqlData,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Performance Comparison: PostgreSQL vs MySQL',
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Execution Time (ms)',
          },
        },
      },
    },
  });

  // Generate chart URL and log it
  console.log('Chart URL:', chart.getUrl());
};

runTests();
