<!-- Reference: ChatGPT for some basis of code  -->
<template>
  <div class="zip-pie">
    <div class="chart-container">
      <canvas ref="chartContainer"></canvas>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const apiURL = import.meta.env.VITE_ROOT_API

export default {
  name: 'ZipPie',
  props: ['event'],
  methods: {
    closeZip() {
      this.$emit('close');
    },
  },
  data() {
    return {
      chartdata: {
        type: 'pie',
        data: {
          labels: [],
          datasets: [{
            label: 'Zip Codes',
            data: [],
            backgroundColor: [] // add backgroundColor property
          }]
        }
      }
    }
  },
  async mounted() {
    const chartContainer = this.$refs.chartContainer;
    if (chartContainer) {
      const { labels, datasets } = this.chartdata.data;
      const options = this.chartdata.options;

      // retrieve client data from MongoDB
      const response = await fetch(`${apiURL}/clients`);
      const clients = await response.json();

      // map zip codes to an array and count frequency of each zip code
      const zipCodes = clients.map(client => client.address.zip).filter(zip => zip); //filter out empty zipcode
      const counts = {};
      zipCodes.forEach(zip => counts[zip] = (counts[zip] || 0) + 1);

      // populate chart data and backgroundColor array
      Object.entries(counts).forEach(([zip, count], index) => {
        labels.push(zip);
        datasets[0].data.push(count);
        datasets[0].backgroundColor.push(getBackgroundColor(index));
      });

      this.chart = new Chart(chartContainer, {
        type: this.chartdata.type,
        data: {
          labels,
          datasets,
        },
        options,
      });
    }
  }
}

// helper function to get unique background color for each zip code
function getBackgroundColor(index) {
  const colors = [
    'rgba(255, 99, 132, 0.7)',
    'rgba(54, 162, 235, 0.7)',
    'rgba(255, 206, 86, 0.7)',
    'rgba(75, 192, 192, 0.7)',
    'rgba(153, 102, 255, 0.7)',
    'rgba(255, 159, 64, 0.7)',
    'rgba(120, 60, 240, 0.7)',
    'rgba(255, 0, 0, 0.7)',
    'rgba(0, 255, 0, 0.7)',
    'rgba(0, 0, 255, 0.7)'
  ];
  return colors[index % colors.length];
}
</script>

