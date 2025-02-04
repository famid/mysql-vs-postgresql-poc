const QuickChart = require('quickchart-js');

const generateChart = async (results) => {
  const chart = new QuickChart();
  chart.setWidth(800);   // Adjust width
  chart.setHeight(400);  // Adjust height
  chart.setBackgroundColor('white'); // Clear background for better visibility

  chart.setConfig({
    type: 'bar',
    data: {
      labels: results.map(r => r.name),
      datasets: [
        {
          label: 'PostgreSQL',
          data: results.map(r => r.postgresTime),
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          barThickness: 40, // Adjust bar thickness
        },
        {
          label: 'MySQL',
          data: results.map(r => r.mysqlTime),
          backgroundColor: 'rgba(255, 159, 64, 0.6)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1,
          barThickness: 40, // Adjust bar thickness
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // Prevents squishing when resizing
      plugins: {
        title: {
          display: true,
          text: 'Performance Comparison: PostgreSQL vs MySQL',
          font: {
            size: 18,
          },
          padding: {
            top: 10,
            bottom: 20,
          },
        },
        legend: {
          position: 'bottom', // Move legend to bottom for clarity
          labels: {
            font: {
              size: 12,
            },
          },
        },
      },
      layout: {
        padding: {
          left: 20,
          right: 20,
          top: 20,
          bottom: 20,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Execution Time (ms)',
            font: {
              size: 14,
            },
          },
        },
        x: {
          ticks: {
            autoSkip: false, // Ensure all labels are visible
            maxRotation: 45, // Tilt labels to prevent overlap
            minRotation: 30,
          },
        },
      },
    },
  });

  try {
    const shortUrl = await chart.getShortUrl(); // Generate a shortened URL
    console.log('Chart URL:', shortUrl);
  } catch (error) {
    console.error('Error generating short URL:', error);
  }
};

module.exports = { generateChart };
