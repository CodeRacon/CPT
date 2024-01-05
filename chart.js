function renderChart() {
  const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'line',
    pointStyle: false,
    data: {
      labels: months,
      datasets: [
        // can have several arrays for multiple charts in it!
        {
          label: 'prices on a monthly chart',
          data: monthlyClosePrices,
          fill: true,
          tension: 0.5,
          borderWidth: 0.5,
          // backgroundColor: '#879f87c0',
          backgroundColor: '#ea2577bf',
        },
      ],
    },
    options: {
      elements: {
        point: {
          pointStyle: false, // defines the styling of the data points
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
