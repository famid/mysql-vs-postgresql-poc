const { runTests } = require('./scripts/benchmark-runner');
const { generateChart } = require('./utils/chart-generator');

const start = async () => {
  const results = await runTests();
  generateChart(results);  // To visualize the performance comparison
};

start();
 