<template>
    <div>
      <canvas ref="chart"></canvas>
    </div>
  </template>
  
  <script>
  import Chart from 'chart.js';
  
  export default {
    mounted() {
      this.renderChart();
    },
    methods: {
      renderChart() {
        const data = {
          labels: ['Zip Code 1', 'Zip Code 2', 'Zip Code 3', 'Zip Code 4'],
          datasets: [{
            data: [25, 20, 15, 10],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#E7E9ED']
          }]
        };
        const options = {
          responsive: true,
          maintainAspectRatio: false
        };
        new Chart(this.$refs.chart, {
          type: 'pie',
          data: data,
          options: options
        });
      }
    }
  };
  </script>
  