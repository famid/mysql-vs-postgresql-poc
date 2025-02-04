const { postgresDb, mysqlDb } = require('../config/db');
const { testCases } = require('../test-cases/queries');


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
  return results;
};


module.exports = { runTests };

